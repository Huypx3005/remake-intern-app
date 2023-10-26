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

const productsCollectionRef = collection(db, "products");

export const getProducts = async () => {
  const data = await getDocs(productsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addProduct = async (name, brand, description, price, category) => {
  await addDoc(productsCollectionRef, {
    name: name,
    brand: brand,
    description: description,
    price: Number(price),
    category: category,
  });
};

export const getProduct = async (id) => {
  const data = await getDoc(doc(db, "products", id));
  return { ...data.data(), id: data.id };
};

export const updateProduct = async (
  id,
  name,
  brand,
  description,
  price,
  category
) => {
  const productDoc = doc(db, "products", id);
  const newFields = {
    name: name,
    brand: brand,
    description: description,
    price: Number(price),
    category: category,
  };
  await updateDoc(productDoc, newFields);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};
