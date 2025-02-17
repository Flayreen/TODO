import React, {useState} from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";

interface ITodoItem {
    title: string;
    children?: React.ReactNode;
}

const TodoListItem: React.FC<ITodoItem> = ({ title, children}) => {
    const {user} = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isAdmin: boolean = user?.role === UserRole.Admin;

    const handleRemoveList = (): void => {

    }

    return (
        <div className="w-full border rounded-2xl shadow-md p-4">
            <button
                className="w-full text-black flex justify-between items-center text-2xl font-medium mb-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                {isAdmin ? (
                    <div className="flex gap-2">
                        <button type="button" className="w-full p-2 text-md text-purple-500 font-semibold border-dashed border-1 border-purple-300 rounded-lg bg-purple-100/10 mb-3 hover:bg-purple-100/50 cursor-pointer">
                            Створити нове завдання
                        </button>
                        <button onClick={handleRemoveList} type="button" className="w-full p-2 text-md text-red-400 font-semibold border-dashed border-1 border-red-400 rounded-lg bg-red-100/10 mb-3 hover:bg-red-100/50 cursor-pointer">
                            Видалити список
                        </button>
                    </div>
                ) : null}

                {children}
            </motion.div>
        </div>
    );
};

export default TodoListItem;