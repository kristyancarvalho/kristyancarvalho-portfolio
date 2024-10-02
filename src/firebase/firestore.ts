import { db } from './config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, increment } from 'firebase/firestore';

export interface Post {
  id?: string;
  title: string;
  content: string;
  description: string;
  coverImage: string;
  createdAt: Date;
  views: number;
}

const COLLECTION_NAME = 'posts';

export const addPost = async (post: Omit<Post, 'id' | 'views'>): Promise<string> => {
  const postWithViews = {
    ...post,
    views: 0
  };
  const docRef = await addDoc(collection(db, COLLECTION_NAME), postWithViews);
  return docRef.id;
};

export const updatePost = async (id: string, post: Partial<Post>): Promise<void> => {
  const postRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(postRef, post);
};

export const deletePost = async (id: string): Promise<void> => {
  const postRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(postRef);
};

export const getPosts = async (): Promise<Post[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { 
      id: doc.id, 
      ...data,
      createdAt: data.createdAt.toDate(),
      views: data.views || 0
    } as Post;
  });
};

export const getPost = async (id: string): Promise<Post | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { 
      id: docSnap.id, 
      ...data,
      createdAt: data.createdAt.toDate(),
      views: data.views || 0
    } as Post;
  } else {
    return null;
  }
};

export const incrementPostViews = async (id: string): Promise<void> => {
  const postRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(postRef, {
    views: increment(1)
  });
};