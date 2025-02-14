import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";


export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth має бути використаний всередині AuthProvider");
    }
    return context;
};