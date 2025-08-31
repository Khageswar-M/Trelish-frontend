import { useEffect, useState } from "react";
import { UserLogin } from "../Services/TodoServices";
import { checkUserName } from "../Services/TodoServices";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../Services/AuthContext";

const Signup = () => {
    const [isSignin, setIsSignin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const { authUser,
            setAuthUser,
            isLoggedIn,
            setIsLoggedIn,
            userId,
            setUserId } = useAuth();



    useEffect(() => {
        if (errorMessage) {
            const timmer = setTimeout(() => {
                setErrorMessage('');
            }, 5000);

            return () => { clearTimeout(timmer); }
        }

    }, [errorMessage])

    // useEffect(() => {
    //     if (isSignin) {
    //         const timer = setTimeout(() => {
    //             setIsSignin(false);
    //         }, 5000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [isSignin]);

    const handleSignin = async (e) => {
        e.preventDefault();

        if (isError) {
            setErrorMessage('Please give a unique & valid user name');
            return;
        }


        try {
            const response = await UserLogin({ email, password });
            console.log(response.data);
            setErrorMessage(null);
            setIsSignin(true);
            setIsLoggedIn(true)

        } catch (error) {
            setErrorMessage('User name is already taken');
        }
    }


    const checkFormValidation = (isOk) => {
        var forms = document.querySelectorAll('.needs-validation');

        Array.from(forms).forEach(form => {
            if (isOk) {
                form.classList.add('was-validated');
            } else {
                form.classList.remove('was-validated');
            }
        })
    }

    const handleUserName = async (email) => {
        var isValid = document.getElementById("emailHelp");
        if (email.length < 5) {
            isValid.innerText = 'More than 5 characters';
            isValid.style.color = 'Black';
            setIsError(true);
            checkFormValidation(false);
            return;
        }
        try {
            if (email.length >= 5) {
                const response = await checkUserName(email);
                if (response.data) {
                    isValid.innerText = 'Already taken';
                    isValid.style.color = 'Red';
                    setIsError(true);
                    checkFormValidation(false);
                } else {
                    isValid.innerText = 'Available';
                    isValid.style.color = 'Green';
                    setIsError(false);
                    checkFormValidation(true);
                }
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            isValid.innerText = 'Invalid';
            isValid.style.color = 'Red';
            checkFormValidation(false);
        }

    }

    return (
        <>
            <AnimatePresence>
                {
                    errorMessage && (
                        <div className="alert alert-warning errorAlert bg-warning bg-gradient" role="alert">
                            {errorMessage}
                        </div>
                    )
                }
                {
                    isSignin && (
                        <div id="siginDone" className="alert alert-success errorAlert bg-success bg-gradient" role="alert">
                            You are successfully signed in
                        </div>
                    )
                }
                <div
                    className="p-5 bg-image"
                    style={{
                        backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
                        height: "300px",
                        backgroundSize: "cover",       // makes image cover entire div
                        backgroundPosition: "center",  // centers the image
                        backgroundRepeat: "no-repeat",  // prevents tiling/repeating
                        position: "absolute",
                        top: "10%",
                        left: "3%",
                        width: "95%"
                    }}
                >
                </div>
                <div id="loginContainer1">
                    <motion.form
                        id="loginForm1"
                        onSubmit={handleSignin}
                        className="row g-3 needs-validation"

                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >

                        <div id="getEmailInput1">
                            <input
                                type="text"
                                placeholder="Enter your user name"
                                id="emailInput1"
                                className="form-control"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    handleUserName(e.target.value);
                                }
                                }
                                onKeyDown={(e) => {
                                    if (e.key === ' ') {
                                        e.preventDefault();
                                    }
                                }}
                                maxLength={20}
                                required
                            />
                            <div
                                id="emailHelp"
                            >
                                More than 5 characters
                            </div>
                        </div>

                        <div id="getPasswordInput">
                            <input
                                id="passwordInput1"
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
                                className="btn btn-primary"
                            >SIGNIN</button>
                        </div>
                        <Link to='/login'>already have account</Link>
                    </motion.form>
                </div>
            </AnimatePresence>
        </>
    )
}
export default Signup;