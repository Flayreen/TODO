import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header.tsx";

import TodoListItem from "../../components/TodoListItem/TodoListItem.tsx";
import Todo from "../../components/Todo/Todo.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";
import CreateListDialog from "./CreateListDialog/CreateListDialog.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchTaskLists} from "../../store/slices/taskListSlice.ts";

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

                    {taskLists.map((data: any, index: any) => (
                        <TodoListItem
                            title={data.title}
                            key={index}
                        >
                            <Todo title={"Title"} description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."/>
                        </TodoListItem>
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