import React, {useState} from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";
import {RemoveListDialog} from "../../pages/Home/RemoveListDialog/RemoveListDialog.tsx";
import EditListDialog from "../../pages/Home/EditListDialog/EditListDialog.tsx";
import CreateTaskDialog from "../../pages/Home/CreateTaskDialog/CreateTaskDialog.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {addUserIntoList} from "../../store/slices/taskListSlice.ts";

interface ITodoItem {
    listId: string;
    title: string;
    children?: React.ReactNode;
}

const TodoListItem: React.FC<ITodoItem> = ({listId, title, children}) => {
    const {user} = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState<boolean>(false);
    const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
    const [isOpenCreateTask, setIsOpenCreateTask] = useState<boolean>(false);
    const [inputUser, setInputUser] = useState<string>("");
    const isAdmin: boolean = user?.role === UserRole.Admin;


    const handleOpenRemoveDialog = (): void => {
        setIsOpenRemoveDialog(true);
    }

    const handleCloseRemoveDialog = (): void => {
        setIsOpenRemoveDialog(false);
    }

    const handleOpenEditDialog = (): void => {
        setIsOpenEditDialog(true);
    }

    const handleCloseEditDialog = (): void => {
        setIsOpenEditDialog(false);
    }

    const handleOpenCreateTask = (): void => {
        setIsOpenCreateTask(true);
    }

    const handleCloseCreateTask = (): void => {
        setIsOpenCreateTask(false);
    }

    const handleGetAccess = async () => {
        try {
            await dispatch(addUserIntoList({listId, email: inputUser}));
            setInputUser("");
            alert("Користувача добавлено");
        } catch (e) {
            console.log(e)
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setInputUser(event.currentTarget.value);
    }

    return (
        <>
            <div className="w-full border rounded-2xl shadow-md p-4">
                <button
                    className="w-full text-black flex justify-between items-center text-2xl font-medium mb-2 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {title}
                    <motion.div
                        animate={{rotate: isOpen ? 180 : 0}}
                        transition={{duration: 0.3}}
                    >
                        <ChevronDown className="w-5 h-5"/>
                    </motion.div>
                </button>
                <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0}}
                    transition={{duration: 0.3}}
                    className="overflow-hidden"
                >
                    {isAdmin ? (
                        <>
                            <div className="flex gap-2">
                                <button onClick={handleOpenCreateTask} type="button"
                                        className="w-full p-2 text-md text-purple-500 font-semibold border-dashed border-1 border-purple-300 rounded-lg bg-purple-100/10 mb-3 hover:bg-purple-100/50 cursor-pointer">
                                    Створити нове завдання
                                </button>
                                <button onClick={handleOpenEditDialog} type="button"
                                        className="w-full p-2 text-md text-orange-400 font-semibold border-dashed border-1 border-orange-400 rounded-lg bg-orange-100/10 mb-3 hover:bg-orange-100/50 cursor-pointer">
                                    Редагувати список
                                </button>
                                <button onClick={handleOpenRemoveDialog} type="button"
                                        className="w-full p-2 text-md text-red-400 font-semibold border-dashed border-1 border-red-400 rounded-lg bg-red-100/10 mb-3 hover:bg-red-100/50 cursor-pointer">
                                    Видалити список
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={inputUser}
                                    className="border-1 p-1 border-purple-500 text-black w-full"
                                    onChange={onChangeInput}
                                    placeholder="Введіть пошту користувача"
                                />
                                <button
                                    type="button"
                                    className="bg-purple-400 p-1 border-1 border-purple-400 text-white"
                                    onClick={handleGetAccess}
                                >
                                    Запросити
                                </button>
                            </div>
                        </>
                    ) : null}

                    {children}
                </motion.div>
            </div>

            <RemoveListDialog
                isOpen={isOpenRemoveDialog}
                onClose={handleCloseRemoveDialog}
                listId={listId}
            />
            <EditListDialog
                isOpen={isOpenEditDialog}
                onClose={handleCloseEditDialog}
                listId={listId}
                listTitle={title}
            />
            <CreateTaskDialog
                isOpen={isOpenCreateTask}
                onClose={handleCloseCreateTask}
                listId={listId}
            />
        </>
    );
};

export default TodoListItem;