import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

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
