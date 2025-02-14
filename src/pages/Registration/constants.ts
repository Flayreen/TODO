import {FormikValues} from "formik";
import * as Yup from "yup";

export const initialValue: FormikValues = {
    name: '',
    email: '',
    password: ''
};

export const validationSchema = Yup.object({
    name: Yup.string()
        .min(2, "Імʼя повинно мати мінім 2 символи")
        .required("Поле обовʼязкове до заповнення"),
    email: Yup.string()
        .email("Некоректна пошта")
        .required("Поле обовʼязкове до заповнення"),
    password: Yup.string()
        .min(6,"Пароль повинен мати мінім 6 символів")
        .required("Поле обовʼязкове до заповнення")
})