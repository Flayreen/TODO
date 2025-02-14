import React, {useState} from "react";
import Header from "../../components/Header/Header.tsx";

import TodoListItem from "../../components/TodoListItem/TodoListItem.tsx";
import Todo from "../../components/Todo/Todo.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";
import CreateListDialog from "./CreateListDialog/CreateListDialog.tsx";

const Home: React.FC = () => {
    const {user} = useAuth();
    const isAdmin: boolean = user?.role === UserRole.Admin;
    const [isCreateList, setIsCreateList] = useState<boolean>(false);

    const openCreateListModal = (): void => {
        setIsCreateList(true)
    }

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

                    <TodoListItem title="Title">
                        {isAdmin ? (
                            <button type="button" className="w-full p-2 text-md text-purple-700 font-medium border-dashed border-1 border-purple-300 rounded-lg bg-purple-500/10 mb-2 hover:bg-purple-500/20 cursor-pointer">
                                Створити нову задачу
                            </button>
                        ) : null}

                        <Todo title={"Title"} description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."/>
                        <Todo title={"Title"} />
                    </TodoListItem>
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