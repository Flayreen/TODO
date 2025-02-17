import React, {useState} from "react";
import {Formik, Form, FormikValues} from "formik";
import {initialValue, validationSchema} from "./constants.ts";
import Button from "../../components/Button/Button.tsx";
import TextField from "../../components/TextField/TextField.tsx";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../auth/loginService.ts";
import {useAuth} from "../../hooks/useAuth.tsx";
import {UserCredential} from "firebase/auth";
import {WebRoutes} from "../../routes/routes.ts";


const Login: React.FC = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (values: FormikValues) => {
        setLoading(true);
        try {
            const userCredential: UserCredential = await loginUser(values.email, values.password);
            const token = await userCredential.user.getIdToken();
            login(token);
            navigate("/");
        } catch (error: any) {
            alert("Невірний логін або пароль");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-100">
            <h1 className="text-black font-medium mb-10">Логін</h1>

            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {() => (
                    <Form className="mb-5">
                        <div className="mb-5">
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
                                text="Увійти"
                                type="submit"
                                isDisabled={loading}
                                isLoading={loading}
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="container flex justify-center gap-2">
                <span className="text-black">Не маєте аккаунт?</span>
                <Link to={WebRoutes.Registration}>Зареєструватися</Link>
            </div>
        </div>
    );
};

export default Login;