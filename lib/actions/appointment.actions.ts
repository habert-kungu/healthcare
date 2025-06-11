"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwrite.types";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

//  CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams,
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment,
    );

    // Revalidate the admin page to ensure the list of appointments and relevant data are updated.
    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    // Log error with context (patientId and userId from appointment object)
    console.error(`Error in createAppointment for patient ${appointment.patient} (User: ${appointment.userId}):`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(100),
      ],
    );

    // Extract patient IDs from appointments
    // This step gathers all unique patient IDs from the appointments list.
    const patientIds = appointments.documents
      .map((appointment: any) => appointment.patient?.$id)
      .filter((id): id is string => !!id); // Filter out null or undefined IDs and ensure type is string

    let patientsMap: { [key: string]: any } = {};
    // Only fetch patients if there are actual patient IDs to fetch.
    if (patientIds.length > 0) {
      // Fetch all patient documents whose $id is in the patientIds list.
      // This is a single query to the database, avoiding N+1 problem.
      const patients = await databases.listDocuments(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        // Query for documents where $id is one of the patientIds
        // Appwrite's Query.equal can take an array of values for equality checks.
        [Query.equal("$id", patientIds)]
      );
      // Create a map of patient data with patient.$id as the key for efficient lookup.
      patientsMap = patients.documents.reduce((acc, patient) => {
        acc[patient.$id] = patient;
        return acc;
      }, {} as { [key: string]: any });
    }

    // Map patient data back to appointments
    // This step iterates through the original appointments and enriches them with patient data.
    const appointmentsWithPatients = appointments.documents.map((appointment: any) => {
      // If appointment.patient or appointment.patient.$id is null or undefined,
      // or if patient is not found in patientsMap, set patient to null.
      // This ensures that appointments without valid patient references or patients not found are handled gracefully.
      const patientData = appointment.patient?.$id ? patientsMap[appointment.patient.$id] : null;
      return {
        ...appointment,
        patient: patientData, // Assign fetched patient data, or null if not found/applicable
      };
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointmentsWithPatients as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts,
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointmentsWithPatients,
    };

    return parseStringify(data);
  } catch (error) {
    // Log error with context
    console.error("Error in getRecentAppointmentList:", error);
    // Return empty data instead of throwing to prevent UI crashes, as per existing pattern
    return parseStringify({
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: []
    });
  }
};

//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId],
    );
    return parseStringify(message);
  } catch (error) {
    // Log error with context (userId). Avoid logging 'content' as it might be sensitive.
    console.error(`Error in sendSMSNotification for userId ${userId}:`, error);
    // Implicitly returns undefined, which is acceptable if SMS failure is non-critical for the calling function.
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      { ...appointment }
    );

    // Ensure the document was actually updated. Appwrite's updateDocument usually throws on failure,
    // but this is an additional safeguard or for cases where it might return null.
    if (!updatedAppointment) {
      throw new Error("Failed to update appointment document (update operation returned no result).");
    }

    const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
    await sendSMSNotification(userId, smsMessage);

    // Revalidate the admin page to reflect changes in appointment status or details.
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    // Log error with context (appointmentId)
    console.error(`Error in updateAppointment for appointmentId ${appointmentId} (User: ${userId}):`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
    );

    return parseStringify(appointment);
  } catch (error) {
    // Log error with context (appointmentId) and correct entity type in message
    console.error(`Error in getAppointment for appointmentId ${appointmentId}:`, error);
    return null; // Explicitly return null on error
  }
};

// TEST CONNECTION
export const testAppwriteConnection = async () => {
  try {
    // Try to list a single document to test connection
    await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.limit(1)]
    );
    return { success: true, message: "Connection successful" };
  } catch (error) {
    console.error("Connection test failed:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Connection failed",
      details: error
    };
  }
};
