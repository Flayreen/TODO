import * as Yup from "yup";
import {CreateTaskList} from "../../../models/taskLists.ts";

export const initialValue: CreateTaskList = {
    title: '',
};

export const validationSchema = Yup.object({
    title: Yup.string().required("Поле обовʼязкове до заповнення")
})


