import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {app} from '../firebaseConfig.ts';
import {addUser} from "../services/dbServices.ts";

const auth = getAuth(app);

export const registerUser = async (email: string, password: string, name: string): Promise<void> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                addUser({email, password, name}, user.uid);
            })
    } catch (error: any) {
        throw new Error(error.message);
    }
};