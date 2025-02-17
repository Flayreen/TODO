import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCveoSs3LPx2svu7MkYWeZU2JlFeQSrFTc",
    authDomain: "auth-91c6c.firebaseapp.com",
    projectId: "auth-91c6c",
    storageBucket: "auth-91c6c.firebasestorage.app",
    messagingSenderId: "736056093164",
    appId: "1:736056093164:web:368c4541741119301238c9"
};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

