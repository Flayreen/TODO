import React from "react";
import {ErrorMessage, Field} from "formik";

interface ITextField {
    name: string;
    type: "text" | "email" | "password";
    label: string;
    placeholder?: string;
}

const TextField: React.FC<ITextField> = ({ name, type, label, placeholder}) => {
    return (
        <div className="container py-2 flex flex-col items-start gap-1">
            <label htmlFor={name} className="text-black">
                {label}
            </label>
            <Field
                type={type}
                name={name}
                placeholder={placeholder}
                className="border-2 border-purple-800/20 p-1 text-black w-full hover:border-purple-800/40 outline-0 focus:border-purple-800"
            />
            <ErrorMessage
                name={name}
                component="span"
                className="text-red-600"
            />
        </div>
    );
};

export default TextField;