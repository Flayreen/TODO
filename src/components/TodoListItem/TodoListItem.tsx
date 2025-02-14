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
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                {children}
            </motion.div>
        </div>
    );
};

export default TodoListItem;