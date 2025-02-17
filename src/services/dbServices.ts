import { doc, addDoc, collection, setDoc, getDocs, getDoc, orderBy, DocumentData, Timestamp, query, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore"
import {db} from "../firebaseConfig.ts"
import {CreateTaskList, TaskDTO, TaskListsDTO} from "../models/taskLists.ts";
import {CreateUser, UserInfo, UserRole} from "../models/user.ts";


export const getUsers = async () => {
    try {
        const q = query(
            collection(db, 'users'),
            orderBy('email', 'desc')
        );
        const docSnap = await getDocs(q);
        const users: UserInfo[] = docSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as UserInfo));
        return users ? users : [];
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
        const docRef = await addDoc(collection(db, 'lists'), {...list, tasks: [], viewers: []});
        return {
            id: docRef.id,
            tasks: [],
            viewers: [],
            ...list,
            date_created_at: Date.now(),
        };
    } catch (e) {
        console.log(e);
    }
}

export const addUserToList = async (listId: string, userEmail: string) => {
    try {
        const docRef = doc(db, 'lists', listId);
        await updateDoc(docRef, {viewers: arrayUnion(userEmail)});
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

export const editList = async (listId: string, oldListTitle: string): Promise<void> => {
    try {
        const docRef = doc(db, 'lists', listId);
        await updateDoc(docRef, {title: oldListTitle});
    } catch (e) {
        console.log(e);
    }
}

export const addTask = async (idList: string, title: string, description: string | undefined) => {
    try {
        const dateCreatedAt = Timestamp.now();
        const docRef = await addDoc(collection(db, 'tasks'), {listId: idList, title: title, description: description, date_created_at: dateCreatedAt, isFinished: false});
        return {
            id: docRef.id,
            title: title,
            description: description,
            isFinished: false,
            listId: idList,
        };
    } catch (e) {
        console.log(e);
    }
}

export const getTasks = async (): Promise<TaskDTO[] | []> => {
    try {
        const q = query(
            collection(db, 'tasks'),
            orderBy('date_created_at', 'desc')
        );
        const docSnap = await getDocs(q);
        const tasks: TaskDTO[] = docSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date_created_at: doc.data().date_created_at.toString(),
        } as TaskDTO));
        return tasks ? tasks : [];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const removeTask = async (taskId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'tasks', taskId);
        await deleteDoc(docRef);
    } catch (e) {
        console.log(e);
    }
}

export const editTask = async (taskId: string, newTitle: string, newDescription: string): Promise<void> => {
    try {
        const docRef = doc(db, 'tasks', taskId);
        await updateDoc(docRef, {title: newTitle, description: newDescription});
    } catch (e) {
        console.log(e);
    }
}

export const checkTask = async (taskId: string, isFinished: boolean): Promise<void> => {
    try {
        const docRef = doc(db, 'tasks', taskId);
        await updateDoc(docRef, {isFinished});
    } catch (e) {
        console.log(e);
    }
}
