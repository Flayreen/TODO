import {Navigate, Outlet, Route} from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import Home from "../pages/Home/Home.tsx";
import React from "react";
import {WebRoutes} from "./routes.ts";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="text-black">Завантаження...</div>;
    }

    return isAuthenticated ? <Home /> : <Navigate to={WebRoutes.Login} replace />;
};

export default ProtectedRoute;