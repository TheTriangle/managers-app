import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  setPersistence,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  inMemoryPersistence,
} from "firebase/auth";

import {
  getFirestore,
  query,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDstpC-1cW7V4e7gTbtk12FOyDR-tdxObU",
  authDomain: "donapp-d2378.firebaseapp.com",
  databaseURL: "https://donapp-d2378.firebaseio.com",
  projectId: "donapp-d2378",
  storageBucket: "donapp-d2378.appspot.com",
  messagingSenderId: "749688238426",
  appId: "1:749688238426:web:f19a238c43725fd181c363",
  measurementId: "G-DFW51L0W1X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    setPersistence(auth, inMemoryPersistence)
      .then(async () => {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const loginWithEmailAndPassword = async (auth, email, password) => {
  setPersistence(auth, inMemoryPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    return signInWithEmailAndPassword(auth, email, password);
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  loginWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordReset,
  logout,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
};
