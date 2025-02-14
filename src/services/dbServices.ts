import {getFirestore, Query, doc, addDoc, collection, setDoc, getDocs, getDoc, updateDoc} from "firebase/firestore"
import app from "../firebaseConfig.ts";

const db = getFirestore(app);

export const getUsers = async () => {
    try {
        const docSnap = await getDocs(collection(db, 'users'));
        return docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getUser = async (id: string) => {
    try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e)
        return [];
    }
}


export const addUser = async (userData, uid) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            role: "Viewer",
            ...userData
        });
        return { id: uid, ...userData };
    } catch (e) {
        console.log(e)
    }
}


export const addList = async (list: any) => {
    try {
        const docRef = await addDoc(collection(db, 'lists'), list);
        return { ...docRef };
    } catch (e) {
        console.log(e)
    }
}
