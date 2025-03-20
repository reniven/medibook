"use server"

import { ID } from "node-appwrite";
import {
  APPOINTMENTS_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

export async function createAppointment(appointment: CreateAppointmentParams) {
  try {
    console.log(appointment)
    console.log(appointment.schedule)
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      ID.unique(),
      appointment,
    );

    console.log(appointment)
    return parseStringify(newAppointment);
  } catch (error) {
    console.log("hello")
    console.log(error);
  }
}
