import React, {useState} from "react";
import {Form, Formik, FormikValues} from "formik";
import {initialValue, validationSchema} from "./constants.ts";
import TextField from "../../components/TextField/TextField.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../auth/authService.ts";
import {WebRoutes} from "../../routes/routes.ts";

const Registration: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (values: FormikValues) => {
        setLoading(true);

        try {
            await registerUser(values.email, values.password, values.name);
            alert('Ви успішно зареєструвалися');
            navigate(WebRoutes.Login)
        } catch (error: any) {
            console.log(error)
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-100">
            <h1 className="text-black font-medium mb-10">Реєстрація</h1>

            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ isSubmitting}) => (
                    <Form className="mb-5">
                        <div className="mb-5">
                            <TextField
                                name="name"
                                type="text"
                                label="Імʼя"
                                placeholder="Введіть імʼя"
                            />
                            <TextField
                                name="email"
                                type="email"
                                label="Пошта"
                                placeholder="Введіть пошту"
                            />
                            <TextField
                                name="password"
                                type="password"
                                label="Пароль"
                                placeholder="Введіть пароль"
                            />
                        </div>

                        <div>
                            <Button
                                text="Зареєструватися"
                                type="submit"
                                isDisabled={loading}
                                isLoading={loading}
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="container flex justify-center gap-2">
                <span className="text-black">Вже маєте аккаунт?</span>
                <Link to={WebRoutes.Login}>Увійти</Link>
            </div>
        </div>
    );
};

export default Registration;