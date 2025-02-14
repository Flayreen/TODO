import React from "react";
import {useAuth} from "../../hooks/useAuth.tsx";
import Button from "../Button/Button.tsx";
import {logOut} from "../../auth/logOut.ts";
import {useNavigate} from "react-router-dom";
import {WebRoutes} from "../../routes/routes.ts";

const Header: React.FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => navigate(WebRoutes.Login));
    }

    return (
        <div className="flex justify-end items-center gap-3 w-full fixed top-0 left-0 p-2 bg-white shadow-md">
            <div className="flex flex-col items-end text-black">
                <span className="font-bold text-xl">
                    {user && user.name}
                </span>
                <span>
                    {user && user.email}
                </span>
            </div>

            <div className="w-30">
                <Button
                    type="button"
                    text="Вийти"
                    onClick={handleLogOut}
                />
            </div>
        </div>
    );
};

export default Header;