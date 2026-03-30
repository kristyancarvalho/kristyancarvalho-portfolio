import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "@/app/config/firebase";

export const db = getFirestore(firebaseApp);
