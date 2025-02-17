import * as Yup from "yup";
import {CreateTask} from "../../../models/taskLists.ts";

export const initialValue: CreateTask = {
    title: '',
    description: '',
    listId: ''
};

export const validationSchema = Yup.object({
    title: Yup.string()
        .min(1, "Назва задачі має містити мінімум 1 символ")
        .required("Поле обовʼязкове до заповнення"),
    description: Yup.string()
})