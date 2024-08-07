import { db } from "../db/firebaseConfig";

// Create a new user in the database
export const createUser = async (
  userId: string,
  email: string,
  role: string = "patient"
) => {
  await db.collection("users").doc(userId).set({ role, email, userId });
};

// Get a user's role from the database
export const getUserRole = async (userId: string) => {
  const userDoc = await db.collection("users").doc(userId).get();
  return userDoc.exists ? userDoc.data() : null;
};
