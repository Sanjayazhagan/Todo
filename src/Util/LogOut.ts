import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // adjust the path to your firebase.ts

export const LogOut = async () => {
  try {
    await signOut(auth);
    console.log("✅ User signed out");
  } catch (error) {
    console.error("❌ Error signing out:", error);
  }
};
