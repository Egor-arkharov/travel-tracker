import type { User as FirebaseUser } from "firebase/auth";

import type { User } from "@/types/user";

export const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  displayName: firebaseUser.displayName || "",
  email: firebaseUser.email || "",
  photoURL: firebaseUser.photoURL || "",
});
