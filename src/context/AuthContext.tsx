import React, {useEffect, useState} from "react";
import {createContext} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getUser} from "../services/dbServices.ts";
import {DocumentData} from "firebase/firestore";

interface IAuthContext {
    user: DocumentData | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<DocumentData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = getAuth();

    useEffect(() => {
        const token: string | null = localStorage.getItem("jwtToken");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const dbUser: DocumentData | undefined = await getUser(currentUser.uid);

                if (dbUser) {
                    setUser(dbUser);
                }
            }

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