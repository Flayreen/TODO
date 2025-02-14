import { createUserWithEmailAndPassword, getAuth, UserCredential, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../firebaseConfig.ts';
import {addUser} from "../services/dbServices.ts";

const auth = getAuth(app);

export const registerUser = async (email: string, password: string, name: string): Promise<UserCredential> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                addUser({email, password, name}, user.uid);
                return updateProfile(user, {
                    displayName: name
                });
            })
    } catch (error: any) {
        throw new Error(error.message);
    }
};