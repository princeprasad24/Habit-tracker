import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./fireBase";

function isValidUniqueId(id) {
  return /^\d{5,}$/.test(id);
}

function convertToEmail(id) {
  return `${id}@habittracker.com`;
}

export async function registerUser(uniqueId, password , name) {
  if (!isValidUniqueId(uniqueId)) {
    throw new Error("Unique ID must contain at least 5 digits.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  const email = convertToEmail(uniqueId);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
    name
      
  );

  return userCredential.user;
}

export async function loginUser(uniqueId, password) {
  if (!isValidUniqueId(uniqueId)) {
    throw new Error("Unique ID must contain at least 5 digits.");
  }

  const email = convertToEmail(uniqueId);

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

export async function logOutUser() {
  await signOut(auth);
}
