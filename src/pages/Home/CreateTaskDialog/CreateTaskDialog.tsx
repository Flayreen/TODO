import React from "react";
import {Form, Formik} from "formik";
import {initialValue, validationSchema} from "./constants.ts";
import TextField from "../../../components/TextField/TextField.tsx";
import Button from "../../../components/Button/Button.tsx";
import {CreateTask} from "../../../models/taskLists.ts";
import {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {addNewTask} from "../../../store/slices/taskListSlice.ts";

interface ICreateTaskDialog {
    isOpen: boolean;
    onClose: () => void;
    listId: string;
}

const CreateTaskDialog: React.FC<ICreateTaskDialog> = ({ isOpen, onClose, listId }) => {
    const dispatch = useDispatch<AppDispatch>();

    if (!isOpen) return null;

    const handleSubmit = async (values: CreateTask) => {
        try {
            await dispatch(addNewTask({listId: listId, title: values.title, description: values.description}));
            onClose();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl text-black font-bold mb-4">Створити нову задачу</h2>
                <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {() => (
                        <Form className="mb-5">
                            <div className="mb-5">
                                <TextField
                                    name="title"
                                    type="text"
                                    label="Назва задачі"
                                    placeholder="Введіть назву задачі"
                                />
                                <TextField
                                    name="description"
                                    type="text"
                                    label="Опис (не обовʼязково)"
                                    placeholder="Введіть опис задачі"
                                />
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button
                                    type="button"
                                    text="Закрити"
                                    onClick={onClose}
                                />
                                <Button
                                    type="submit"
                                    text="Створити"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateTaskDialog;