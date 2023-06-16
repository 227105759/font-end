// this page for the firebase set up
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { GoogleAuthProvider } from "@firebase/auth";

import { getDatabase, ref, set } from "firebase/database";

//the APi keys has renamed for the security reason
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const firestore = app.firestore();
export const database = getDatabase();
export const storage = app.storage();
export const provider = new GoogleAuthProvider();
export default app;


export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName, uType } = additionalData;

    try {
      userRef.set({
        displayName,
        uType,
        email,
        createdAt: new Date(),
        //id: user.uid,
      });

      userRef.get({
        email
      })

      
      const data = {uid : user.uid}
      localStorage.setItem('uid', JSON.stringify(data));
      console.log(data)
    

    } catch (error) {
      console.log("Error in creating user", error);
    }
  }
};
