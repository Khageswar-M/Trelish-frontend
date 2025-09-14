import { useEffect, useState } from "react";
import { UserLogin } from "../Services/TodoServices";
import { checkUserName } from "../Services/TodoServices";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../Services/AuthContext";

import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [isSignin, setIsSignin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const [isError, setIsError] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const navigator = useNavigate();

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
            }, 2000);

            return () => { clearTimeout(timmer); }
        }

    }, [errorMessage])

    useEffect(() => {
        checkFormValidation(false);
        if(password === repassword && !isError){
            checkFormValidation(true);
        }
    }, [repassword, email, password]);

    const handleSignin = async (e) => {
        e.preventDefault();
        if (password !== repassword) {
            setErrorMessage('Incorrect password');
            return;
        }

        if (isError) {
            setErrorMessage('Please give a unique & valid user name');
            return;
        }


        try {
            const response = await UserLogin({ email, password });
            setErrorMessage(null);
            setIsSignin(true);
            setIsLoggedIn(true);
            setUserId(response.data.userId);
            setAuthUser({
                Name: response.data.email
            })
            

            setTimeout(() => {
                navigator('/todos');
            }, 2000);

        } catch (error) {
            console.error(error);
            setErrorMessage('User name is already taken');
        }
    }


    const checkFormValidation = (isOk) => {
        var forms = document.querySelectorAll('.needs-validation');

        Array.from(forms).forEach(form => {
            if (isOk && password === repassword) {
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
            
                {
                    errorMessage && (
                        <div id="toast-warning" class="errorAlert flex items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                                </svg>
                                <span class="sr-only">Warning icon</span>
                            </div>
                            <div class="ms-3 text-sm font-normal">{errorMessage}</div>
                            <button type="button" class="ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close"
                                onClick={() => {
                                    document.getElementById("toast-warning").style.display = "none";
                                }}
                            >
                                <span class="sr-only">Close</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    )
                }
                {
                    isSignin && (
                        <div id="siginDone" className="alert alert-success errorAlert bg-success bg-gradient" role="alert"
                            style={{
                                zIndex: '3'
                            }}
                        >
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
                    key="formLogin"
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
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                maxLength={10}
                                required
                            />
                            <div className="valid-feedback">

                            </div>
                        </div>
                        <div id="getReEnteredPasswordInput">
                            <input
                                id="passwordInput2"
                                className="form-control"
                                type="text"
                                placeholder="Re-enter password"
                                onChange={(e) =>{ 
                                    setRePassword(e.target.value)
                                
                                }}
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
                        <Link to='/login'>already have an account</Link>
                    </motion.form>
                </div>
        </>
    )
}
export default Signup;