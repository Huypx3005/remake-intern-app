// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// import { auth } from "./firebase";

// export const getUser = () => {
//   return auth.currentUser;
// };

// export const signUp = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const logIn = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const logOut = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     console.log(error);
//   }
// };
