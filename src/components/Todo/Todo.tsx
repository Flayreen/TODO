import React, {useState} from "react";
import { Edit, TrashIcon, Check } from "lucide-react";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserRole} from "../../models/user.ts";

interface ITodo {
    title: string;
    description?: string;
}

const Todo: React.FC<ITodo> = ({ title, description}) => {
    const {user} = useAuth();
    const [checked, setChecked] = useState<boolean>(false);
    const isAdmin: boolean = user?.role === UserRole.Admin;

    return (
        <div className="mt-2 p-2 px-4 bg-gray-100 text-black rounded-xl flex justify-between gap-3 items-center">
            <div className={`flex flex-col items-start ${checked ? 'line-through' : ''}`}>
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
                      <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 cursor-pointer">
                          <Edit/>
                      </button>
                      <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 cursor-pointer">
                          <TrashIcon/>
                      </button>
                  </>
                ) : null}
                <label className="flex items-center gap-2 cursor-pointer">
                    <div
                        className={`w-10 h-10 border-2 rounded-md flex items-center justify-center transition-colors ${
                            checked ? "bg-purple-500 border-purple-500" : "border-purple-400"
                        }`}
                        onClick={() => setChecked(!checked)}
                    >
                        {checked && <Check size={16} color="white" />}
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Todo;