import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store.ts";
import {CreateTaskList} from "../../../models/taskLists.ts";
import {editTaskList} from "../../../store/slices/taskListSlice.ts";
import {Form, Formik} from "formik";
import {validationSchema} from "../CreateListDialog/constants.ts";
import TextField from "../../../components/TextField/TextField.tsx";
import Button from "../../../components/Button/Button.tsx";

interface IEditListDialog {
    isOpen: boolean;
    onClose: () => void;
    listId: string;
    listTitle: string;
}

const EditListDialog: React.FC<IEditListDialog> = ({ isOpen, onClose, listId, listTitle }) => {
    const dispatch = useDispatch<AppDispatch>();

    if (!isOpen) return null;

    const handleSubmit = async (values: CreateTaskList) => {
        try {
            await dispatch(editTaskList({id: listId, newTitle: values.title}));
            onClose();
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl text-black font-bold mb-4">Редагування списку</h2>
                <Formik
                    initialValues={{ title: listTitle }}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={handleSubmit}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {() => (
                        <Form>
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
                                    type="submit"
                                    text="Редагувати"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditListDialog;
