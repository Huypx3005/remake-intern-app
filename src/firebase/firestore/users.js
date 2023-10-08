import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const usersCollectionRef = collection(db, "users");

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addUser = async (name, age, gender) => {
  await addDoc(usersCollectionRef, {
    name: name,
    age: Number(age),
    gender: gender,
  });
};

export const getUser = async (id) => {
  const data = await getDoc(doc(db, "users", id));
  return { ...data.data(), id: data.id };
};

export const updateUser = async (id, name, age, gender) => {
  const userDoc = doc(db, "users", id);
  const newFields = { age: age, name: name, gender: gender };
  await updateDoc(userDoc, newFields);
};

export const deleteUser = async (id) => {
  await deleteDoc(doc(db, "users", id));
};
