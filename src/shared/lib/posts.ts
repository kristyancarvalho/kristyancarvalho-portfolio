import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "./firestore";
import type { Post } from "@/shared/types";

const COLLECTION = "posts";

function toPost(id: string, data: Record<string, unknown>): Post {
  return {
    id,
    title: data.title as string,
    description: data.description as string,
    content: data.content as string,
    coverImage: data.coverImage as string,
    createdAt: (data.createdAt as { toDate(): Date }).toDate(),
    views: (data.views as number) || 0,
  };
}

export async function getPosts(): Promise<Post[]> {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map(d => toPost(d.id, d.data() as Record<string, unknown>));
}

export async function getPost(id: string): Promise<Post | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return toPost(snap.id, snap.data() as Record<string, unknown>);
}

export async function incrementViews(id: string): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { views: increment(1) });
}
