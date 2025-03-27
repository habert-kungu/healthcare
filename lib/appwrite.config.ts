import * as sdk from "node-appwrite";

const requiredEnvVars = [
  'NEXT_PUBLIC_ENDPOINT',
  'PROJECT_ID',
  'API_KEY',
  'DATABASE_ID',
  'PATIENT_COLLECTION_ID',
  'DOCTOR_COLLECTION_ID',
  'APPOINTMENT_COLLECTION_ID',
  'NEXT_PUBLIC_BUCKET_ID'
] as const;

// Check for missing environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
