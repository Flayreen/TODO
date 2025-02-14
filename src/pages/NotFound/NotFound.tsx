import React from "react";
import {Link} from "react-router-dom";
import {WebRoutes} from "../../routes/routes.ts";
import Button from "../../components/Button/Button.tsx";

const NotFound: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-purple-900 dark:text-primary-500">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        Щось трапилося.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                        Сторінку не знайдено. Ви можете повернутися назад на головну сторінку
                    </p>
                    <Link to={WebRoutes.Home}>
                        <Button
                            type="button"
                            text="Назад на головну"
                            isDisabled={false}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;