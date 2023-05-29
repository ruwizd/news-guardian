// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1T6uxNOWuqZAIsQlbxWffnMLptdEIlQU",
    authDomain: "news-guardian-e84a3.firebaseapp.com",
    projectId: "news-guardian-e84a3",
    storageBucket: "news-guardian-e84a3.appspot.com",
    messagingSenderId: "174596498536",
    appId: "1:174596498536:web:fd5562acdd7b8146d807dd"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const auth = getAuth(app);
export const db = getFirestore(app);