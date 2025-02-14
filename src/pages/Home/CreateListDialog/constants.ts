import {FormikValues} from "formik";
import * as Yup from "yup";

export const initialValue: FormikValues = {
    title: '',
};

export const validationSchema = Yup.object({
    title: Yup.string().required("Поле обовʼязкове до заповнення")
})


