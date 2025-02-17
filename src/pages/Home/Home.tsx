import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header.tsx";

import TodoListItem from "../../components/TodoListItem/TodoListItem.tsx";
import Todo from "../../components/Todo/Todo.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";
import CreateListDialog from "./CreateListDialog/CreateListDialog.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchTaskLists, fetchTasks} from "../../store/slices/taskListSlice.ts";
import {TaskDTO, TaskListsDTO} from "../../models/taskLists.ts";

const Home: React.FC = () => {
    const {user} = useAuth();
    const isAdmin: boolean = user?.role === UserRole.Admin;
    const [isCreateList, setIsCreateList] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const {taskLists} = useSelector((state: RootState) => state.taskList)

    const openCreateListModal = (): void => {
        setIsCreateList(true)
    }

    useEffect(() => {
        dispatch(fetchTaskLists());
        dispatch(fetchTasks())
    }, [dispatch])

    return (
        <>
            <div className="w-1/2">
                <Header/>

                <div className="mt-15 min-h-screen">
                    {isAdmin ? (
                        <button type="button" onClick={openCreateListModal} className="w-full p-3 text-lg text-purple-950 font-semibold border-dashed border-2 border-purple-400 rounded-lg bg-purple-600/10 mb-3 hover:bg-purple-600/20 cursor-pointer">
                            Створити новий список
                        </button>
                    ) : null}

                    {taskLists.map((data: TaskListsDTO, index: number) => (
                        <div key={index}>
                            {isAdmin || data.viewers.includes(user?.email) ?
                                (
                                    <TodoListItem
                                        key={index}
                                        title={data.title}
                                        listId={data.id}
                                    >
                                        {data.tasks.map((task: TaskDTO, index: number) => (
                                            <Todo
                                                key={index}
                                                title={task.title}
                                                description={task.description}
                                                listId={task.listId}
                                                taskId={task.id}
                                                isFinished={task.isFinished}
                                            />
                                        ))}
                                    </TodoListItem>
                                ) : null
                            }
                        </div>
                    ))}
                </div>
            </div>

            <CreateListDialog
                isOpen={isCreateList}
                onClose={() => setIsCreateList(false)}
            />
        </>
    );
};

export default Home;