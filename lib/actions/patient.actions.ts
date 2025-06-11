"use server";

import { revalidatePath } from "next/cache"; // Added import for revalidatePath
import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    // Log detailed error information. The 'error' object itself may contain specifics from Appwrite.
    // Avoid logging sensitive PII directly in the string if possible, let Sentry capture details from the error object.
    console.error(`Error in createUser: Failed to create user (email: ${user.email}). Details:`, error);
    throw error; // Re-throw the error to be handled by the caller or global error handler
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    // Log error with context (userId)
    console.error(`Error in getUser for userId ${userId}:`, error);
    return null; // Explicitly return null on error
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    // Revalidate the admin page to reflect the new patient registration
    revalidatePath("/admin");

    return parseStringify(newPatient);
  } catch (error) {
    // Log error with context (patient.userId)
    console.error(`Error in registerPatient for user ID ${patient.userId}:`, error);
    // Re-throw a new error to be handled by the caller, ensuring sensitive details aren't propagated directly if 'error' object contains them.
    throw new Error(error instanceof Error ? `Patient registration failed: ${error.message}` : "Patient registration failed due to an unknown error");
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    const patient = patients.documents[0];
    if (!patient) return null;
    
    return parseStringify(patient);
  } catch (error) {
    // Log error with context (userId)
    console.error(`Error in getPatient for userId ${userId}:`, error);
    return null; // Return null on error as per existing pattern
  }
};
