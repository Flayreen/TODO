import { signOut, getAuth } from "firebase/auth";
import {app} from '../firebaseConfig.ts';

const auth = getAuth(app);

export const logOut = async (): Promise<void> => {
    try {
        return await signOut(auth)
            .then(() => {
                localStorage.removeItem("jwtToken")
            });
    } catch (error: any) {
        throw new Error(error.message);
    }
};