import React from "react";
import Button from "../../../components/Button/Button.tsx";

interface IRemoveListDialogProps {}

export const RemoveListDialog: React.FC<IRemoveListDialogProps> = () => {

    const handleRemove = () => {

    }

    const handleClose = () => {

    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                <h2 className="text-xl text-black font-bold mb-4">Ви справді хочете видалити цей список?</h2>
                <Button
                    type="button"
                    text="Закрити"
                    onClick={handleClose}
                />
                <Button
                    type="button"
                    text="Створити"
                    onClick={handleRemove}
                />
            </div>
        </div>
    );
};