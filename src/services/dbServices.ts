import { doc, addDoc, collection, setDoc, getDocs, getDoc, orderBy, DocumentData, Timestamp, query, deleteDoc } from "firebase/firestore"
import {db} from "../firebaseConfig.ts"
import {CreateTaskList, TaskListsDTO} from "../models/taskLists.ts";
import {CreateUser, UserInfo, UserRole} from "../models/user.ts";


export const getUsers = async () => {
    try {
        const docSnap = await getDocs(collection(db, 'users'));
        return docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getUser = async (id: string): Promise<DocumentData | undefined> => {
    try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e)
        return [];
    }
}


export const addUser = async (userData: CreateUser, uid: string): Promise<UserInfo | undefined> => {
    try {
        await setDoc(doc(db, 'users', uid), {
            role: UserRole.Viewer,
            ...userData
        });
        return { id: uid, role: UserRole.Viewer,  ...userData };
    } catch (e) {
        console.log(e)
    }
}

export const getTaskLists = async (): Promise<TaskListsDTO[] | []> => {
    try {
        const q = query(
            collection(db, 'lists'),
            orderBy('date_created_at', 'desc')
        );
        const docSnap = await getDocs(q);
        const taskLists: TaskListsDTO[] = docSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date_created_at: doc.data().date_created_at.toString(),
        } as TaskListsDTO));
        return taskLists ? taskLists : [];
    } catch (e) {
        console.log(e);
        return [];
    }
}


export const addList = async (list: CreateTaskList) => {
    try {
        list.date_created_at = Timestamp.now();
        const docRef = await addDoc(collection(db, 'lists'), list);
        return {
            id: docRef.id,
            ...list,
            date_created_at: Date.now(),
        };
    } catch (e) {
        console.log(e);
    }
}

export const removeList = async (listId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'lists', listId);
        await deleteDoc(docRef);
    } catch (e) {
        console.log(e);
    }
}
