import React, {useState} from "react";
import { Edit, TrashIcon, Check } from "lucide-react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";
import RemoveTaskDialog from "../../pages/Home/RemoveTaskDialog/RemoveTaskDialog.tsx";
import EditTaskDialog from "../../pages/Home/EditTaskDialog/EditTaskDialog.tsx";
import {updateCompleteTask} from "../../store/slices/taskListSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch} from "react-redux";

interface ITodo {
    listId: string;
    taskId: string;
    title: string;
    description: string;
    isFinished: boolean;
}

const Todo: React.FC<ITodo> = ({ title, description, listId, taskId, isFinished }) => {
    const {user} = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const isAdmin: boolean = user?.role === UserRole.Admin;

    const handleOpenDeleteTodo = () => {
        setIsOpenDelete(true);
    }
    const handleCloseDeleteTodo = () => {
        setIsOpenDelete(false);
    }

    const handleOpenEditTodo = () => {
        setIsOpenEdit(true);
    }
    const handleCloseEditTodo = () => {
        setIsOpenEdit(false);
    }

    const handleComplete = async () => {
        try {
            await dispatch(updateCompleteTask({id: taskId, listId, isFinished: !isFinished}));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="mt-2 p-2 px-4 bg-gray-100 text-black rounded-xl flex justify-between gap-3 items-center">
                <div className={`flex flex-col items-start ${isFinished ? 'line-through' : ''}`}>
                    <span className="font-bold text-xl">
                        {title}
                    </span>
                    <p className="text-start">
                        {description}
                    </p>
                </div>

                <div className="flex gap-1">
                    {isAdmin ? (
                      <>
                          <button onClick={handleOpenEditTodo} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 cursor-pointer">
                              <Edit/>
                          </button>
                          <button onClick={handleOpenDeleteTodo} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 cursor-pointer">
                              <TrashIcon/>
                          </button>
                      </>
                    ) : null}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div
                            className={`w-10 h-10 border-2 rounded-md flex items-center justify-center transition-colors ${
                                isFinished ? "bg-purple-500 border-purple-500" : "border-purple-400"
                            }`}
                            onClick={handleComplete}
                        >
                            {isFinished && <Check size={16} color="white" />}
                        </div>
                    </label>
                </div>
            </div>

            <RemoveTaskDialog
                isOpen={isOpenDelete}
                onClose={handleCloseDeleteTodo}
                listId={listId}
                taskId={taskId}
            />
            <EditTaskDialog
                isOpen={isOpenEdit}
                onClose={handleCloseEditTodo}
                taskId={taskId}
                listId={listId}
                title={title}
                description={description}
            />
        </>
    );
};

export default Todo;