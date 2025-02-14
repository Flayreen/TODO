import React, {useEffect, useState} from "react";
import {createContext, useContext} from "react";
import {getAuth, User, onAuthStateChanged} from "firebase/auth";
import {getUser} from "../services/dbServices.ts";
import {UserInfo} from "../models/user.ts";

interface IAuthContext {
    user: UserInfo | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth();

    useEffect(() => {
        const token: string = localStorage.getItem("jwtToken");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            const dbUser = await getUser(currentUser.uid)
            setUser(dbUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = (token: string) => {
        localStorage.setItem("jwtToken", token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
};