import { signInWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";
import app from '../firebaseConfig.ts';

const auth = getAuth(app);

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        throw new Error(error.message);
    }
};