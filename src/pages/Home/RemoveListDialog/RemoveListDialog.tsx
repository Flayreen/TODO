import React from "react";
import Button from "../../../components/Button/Button.tsx";
import {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {removeTaskList} from "../../../store/slices/taskListSlice.ts";

interface IRemoveListDialogProps {
    isOpen: boolean;
    onClose: () => void;
    listId: string;
}

export const RemoveListDialog: React.FC<IRemoveListDialogProps> = ({ isOpen, onClose, listId }) => {
    const dispatch = useDispatch<AppDispatch>();

    if (!isOpen) return null;

    const handleRemove = async () => {
        try {
            await dispatch(removeTaskList(listId));
            onClose();
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl text-black font-bold mb-4">Ви справді хочете видалити цей список?</h2>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button
                        type="button"
                        text="Закрити"
                        onClick={onClose}
                    />
                    <Button
                        type="button"
                        text="Видалити"
                        onClick={handleRemove}
                    />
                </div>
            </div>
        </div>
    );
};