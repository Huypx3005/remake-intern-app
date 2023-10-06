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
  try {
    const data = await getDocs(usersCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.log(err);
  }
};

export const addUser = async (name, age, gender) => {
  try {
    await addDoc(usersCollectionRef, {
      name: name,
      age: Number(age),
      gender: gender,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id) => {
  try {
    const data = await getDoc(doc(db, "users", id));
    return { ...data.data(), id: data.id };
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (id, name, age, gender) => {
  try {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age, name: name, gender: gender };
    await updateDoc(userDoc, newFields);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (err) {
    console.log(err);
  }
};
