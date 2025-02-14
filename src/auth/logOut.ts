import { signOut, getAuth, UserCredential } from "firebase/auth";
import app from '../firebaseConfig.ts';

const auth = getAuth(app);

export const logOut = async (): Promise<UserCredential> => {
    try {
        return await signOut(auth)
            .then(() => {
                localStorage.removeItem("jwtToken")
            });
    } catch (error: any) {
        throw new Error(error.message);
    }
};