import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const descriptionCollectionRef = collection(db, "description");

export const checkDescIsExist = async (uid) => {
  const docRef = doc(db, "description", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

export const addDescription = async (uid) => {
  const descDocRef = doc(descriptionCollectionRef, uid);

  await setDoc(descDocRef, {
    content: "",
  });
};

export const getDescription = async (uid) => {
  const data = await getDoc(doc(db, "description", uid));
  return { ...data.data(), uid: data.id };
};

export const updateDescription = async (uid, newDescription) => {
  const descDoc = doc(db, "description", uid);
  const newFields = { content: newDescription };
  await updateDoc(descDoc, newFields);
};
