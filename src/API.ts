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
import { CalendarEvent, CalendarGroup } from 'custom-mbd-components';

export async function login(email: string, password: string): Promise<void> {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  const auth = getAuth();
  await signOut(auth);
  currentUser.value = null;
}

export async function createEntry(time: string, date: string) {
  const docId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const event = {
    start: date + ' ' + time,
  };
  await setDoc(doc(getFirestore(), 'timestamps', docId), { event });
}

export async function updateEntry(id: string, event: CalendarEvent) {
  await updateDoc(doc(getFirestore(), 'timestamps', id), { event });
}

export async function getEntries(): Promise<CalendarEvent[]> {
  const querySnapshot = await getDocs(collection(getFirestore(), 'timestamps'));
  const events: CalendarEvent[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    events.push({ ...doc.data().event, id: doc.id });
  });
  return events;
}
