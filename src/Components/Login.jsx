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


    useEffect(() => {
        if (isInvalid) {
            const timer = setTimeout(() => {
                setIsInvalid(false);
            }, 4000);

            return () => { clearTimeout(timer) }
        }

    }, [isInvalid])

    //function for handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await getUserId({ email, password });
            console.log(response.data);
            const uid = response.data;
            // setIsLoged(true);
            setUserId(uid);

            setIsLoggedIn(true);
            navigator('/todos');
            setAuthUser({
                Name: 'Khageswar Maharana'
            })



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
        setAuthUser(null);
    }

    return (
        <>
            <AnimatePresence mode="wait">
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
                        <div
                            style={{
                                color: 'lightred',
                                fontSize: '1.3rem',
                                width: '50%',
                                textAlign: 'center'
                            }}
                            id="loginDone"
                            className="alert alert-warning successAlert bg-warning bg-gradient" role="alert">
                            Invalid username & password<i className="bi bi-check2-all"></i>
                        </div>
                    )
                }

                <div
                    className="p-5 bg-image"
                    style={{
                        backgroundImage: "url('https://wallpaperbat.com/img/870459-4k-4k-abstract-liquid-rare-gallery-hd-wallpaper.jpg')",
                        height: "300px",
                        backgroundSize: "cover",       // makes image cover entire div
                        backgroundPosition: "center",  // centers the image
                        backgroundRepeat: "no-repeat",  // prevents tiling/repeating
                        position: "absolute",
                        top: "10%",
                        left: "3%",
                        width: "95%"
                    }}
                ></div>

                <div id="loginContainer">
                    <div class="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            class="img-fluid" alt="Phone image" />
                    </div>
                    {!isLoggedIn &&

                        <motion.form
                            onSubmit={handleLogin}
                            id="loginForm"
                            className="row g-3 needs-validation"
                            initial={{ opacity: 0, y: 20 }}
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

            </AnimatePresence>
        </>
    )
}
export default Login;