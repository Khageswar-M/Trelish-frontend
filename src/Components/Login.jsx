import React, { useEffect, useState } from "react";
import { getUserId } from "../Services/TodoServices";
import { Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../Services/AuthContext";


const Login = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigator = useNavigate();

    const [isInvalid, setIsInvalid] = useState(false);

    const { authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId } = useAuth();


    // useEffect(() => {
    //     if (isInvalid) {
    //         const timer = setTimeout(() => {
    //             setIsInvalid(false);
    //         }, 4000);

    //         return () => { clearTimeout(timer) }
    //     }

    // }, [isInvalid])

    //function for handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await getUserId({ email, password });
            console.log(response.data);
            const uid = response.data;
            setUserId(uid);

            setIsLoggedIn(true);
            setAuthUser({
                Name: email
            })

            window.location.href = "/todos";



        } catch (error) {
            console.error(error);
            console.log('invalid user name and password');
            setIsInvalid(true);
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setUserId(null);

        setIsLoggedIn(false);
        setAuthUser({
            Name: 'Guest'
        });
    }

    return (
        <>
            <AnimatePresence>
                {isLoggedIn &&

                    <motion.div
                        key="logout-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}

                        id="logoutContainer"
                    >

                        <button
                            id="logoutBtn"
                            onClick={(e) => {
                                handleLogout(e)
                            }}
                            className="btn btn-outline-danger"
                        >
                            Logout<i className="bi bi-person-fill-x"></i>
                        </button>
                    </motion.div>
                }
                {
                    isInvalid && (
                        <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert"
                            style={{
                                display: "flex",
                                position: "absolute",
                                right: "2vw",
                                top: "10%",
                                backgroundColor: "#1b1b1bff",
                                zIndex: 1,
                                
                            }}
                        >

                            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                                </svg>
                                <span className="sr-only">Warning icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">Invalid username & password</div>
                            <button type="button" className="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close"
                                style={{backgroundColor: "transparent", border: "none"}}
                                onClick={() => document.getElementById("toast-success").style.display="none"}
                            >
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        // <div
                        //     style={{
                        //         color: 'lightred',
                        //         fontSize: '1.3rem',
                        //         width: '50%',
                        //         textAlign: 'center',
                        //         zIndex: "3"
                        //     }}
                        //     id="loginDone"
                        //     className="alert alert-warning successAlert bg-warning bg-gradient" role="alert"
                        // >
                        //     Invalid username & password<i className="bi bi-check2-all"></i>
                        // </div >
                    )
                }


                <div id="loginContainer">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid" alt="Phone image" />
                    </div>
                    {!isLoggedIn &&

                        <motion.form
                            onSubmit={handleLogin}
                            id="loginForm"
                            className="row g-3 needs-validation"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >


                            <div id="getEmailInput">
                                <input
                                    type="text"
                                    placeholder="Enter your user name"
                                    id="emailInput"
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === ' ') {
                                            e.preventDefault();
                                        }
                                    }}
                                    maxLength={20}
                                    required
                                />
                            </div>

                            <div id="getPasswordInput">
                                <input
                                    id="passwordInput"
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    maxLength={10}
                                    required
                                />
                                <div className="valid-feedback">

                                </div>
                            </div>

                            <div id="formSubmitBtn" style={{ textAlign: "center" }}>
                                <button
                                    type="submit"
                                    id="loginSubmitBtn"
                                    className="btn btn-primary btn-lg btn-block"
                                >LOGIN</button>
                            </div>
                            <Link to='/signin'>don't have account</Link>
                        </motion.form>
                    }
                </div>

            </AnimatePresence >
        </>
    )
}
export default Login;