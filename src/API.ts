import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getDocs,
    getDoc,
    getFirestore,
    QueryDocumentSnapshot,
    setDoc,
    updateDoc,
    query,
    where,
    deleteDoc,
  } from 'firebase/firestore';
  import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
  import { currentUser } from './router';
  
  export async function login(email: string, password: string): Promise<void> {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }
  
  export async function logout(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
    currentUser.value = null;
  }
  
  
