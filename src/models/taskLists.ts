import { Timestamp } from "firebase/firestore";

export interface CreateTaskList {
    title: string;
    date_created_at?: Timestamp;
}

export interface TaskListsDTO {
    id: string;
    title: string;
    date_created_at: string;
}