import { Timestamp } from "firebase/firestore";

export interface CreateTaskList {
    title: string;
    date_created_at?: Timestamp;
}

export interface TaskListsDTO {
    id: string;
    title: string;
    tasks: TaskDTO[];
    date_created_at: string;
    viewers: string[];
}

export interface CreateTask {
    title: string;
    description: string;
    listId: string;
}

export interface TaskDTO {
    id: string;
    title: string;
    description: string;
    listId: string;
    isFinished: boolean;
    date_created_at: string;
}