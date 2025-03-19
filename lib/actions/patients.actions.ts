"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENTS_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE USER
export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log(newUser);

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents.users[0];
    }

    console.error("An error occurred while creating a new user:", error);
  }
}

// GET USER
export async function getUser(userId: string) {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error: any) {
    console.error("An error occurred while fetching user:", error);
  }
}

// REGISTER PATIENT
export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

      const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENTS_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentID: file?.$id || null,
          identificationDocumentURL: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...patient,
        }
      );

      return parseStringify(newPatient);
    }
  } catch (error) {
    console.log("An error occurred while registering patient:", error);
  }
}

// GET PATIENT
export async function getPatient(userId: string) {
  try {
    const patient = await databases.listDocuments(
      DATABASE_ID!,
      PATIENTS_COLLECTION_ID!,
      [
        Query.equal("userID", userId)
      ],
    );

    return parseStringify(patient.documents[0]);
  } catch (error: any) {
    console.error("An error occurred while fetching patient:", error);
  }
}
