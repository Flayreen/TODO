import React, { useState } from "react";
import {Form, Formik, FormikValues} from "formik";
import {initialValue, validationSchema} from "./constants.ts";
import TextField from "../../../components/TextField/TextField.tsx";
import Button from "../../../components/Button/Button.tsx";
import {useDispatch} from "react-redux";
// import {AppDispatch} from "../../../store/store.ts";
// import {createTaskList} from "../../../store/slices/taskListSlice.ts";

interface ICreateListDialog {
    isOpen: boolean;
    onClose: () => void;
}

const CreateListDialog: React.FC<ICreateListDialog> = ({ isOpen, onClose, onSubmit }) => {
    // const dispatch = useDispatch<AppDispatch>();


    if (!isOpen) return null;

    const handleSubmit = async (values: FormikValues) => {
        // await dispatch(createTaskList())
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl text-black font-bold mb-4">Створення нового списку</h2>
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            name="title"
                            type="text"
                            label="Назва списку"
                            placeholder="Введіть назву списку"
                        />

                        <div className="flex justify-end space-x-2 mt-4">
                            <Button
                                type="button"
                                text="Закрити"
                                onClick={onClose}
                            />
                            <Button
                                // type="submit"
                                text="Створити"
                            />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default CreateListDialog;
