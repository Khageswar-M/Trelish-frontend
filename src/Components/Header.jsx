import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../Services/AuthContext";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Loader from "./Loader";



const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    

    const { authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId } = useAuth();


    const loginStatus = () => {
        if (isLoggedIn) {
            return <i style={{ fontSize: "2rem" }} className="bi bi-person-check"></i>
        } else {
            return <i style={{ fontSize: "2rem" }} className="bi bi-person-dash"></i>
        }
    }

    const locationHandler = (path) => {
        switch (location.pathname) {
            case ('/home'):
                return path === '/home' ? { color: 'blue' } : {};
            case ('/todos'):
                return path === '/todos' ? { color: 'blue' } : {};
            case ('/about'):
                return path === '/about' ? { color: 'blue' } : {};
            case ('/login'):
                return path === '/login' ? { color: 'blue' } : {};
            case ('/signin'):
                return path === '/signin' ? { color: 'blue' } : {};
            default:
                return {};
        }
    }

    const iconStatus = () => {
        if (authUser.Name != 'Guest') {
            return (<i className="bi bi-house-fill" style={{
                fontSize: "1.5rem",
                color: "hsl(202.72deg 100% 50%)"
            }}></i>);
        } else {
            return (<i className="bi bi-house" style={{
                fontSize: "1.5rem",
                color: "gray"
            }}></i>)
        }
    }


    return (
        <>
            <motion.div
                whileHover={{cursor: "pointer", scale: 1.01}}
                // initial={{left: "-3vw", opacity: 0}}
                // animate={{left: "-3px", opacity:1}}
                transition={{duration: 1.5}}
                onClick={() => {
                    if(location.pathname === '/todos'){ navigate('/home');}
                    else if(location.pathname === '/home'){ navigate('/todos');}
                    else {navigate('/home');} 
                }}
                className="userBlink"
            style={{
                top: "4vw",
                position: "absolute",
                left: "-3px",
                backgroundColor: "rgb(0 0 0 / 19%)",
                padding: "0px 15px 4px 10px",
                borderRadius: "0px 20px 20px 0px",
                color: "rgb(255 255 255)",
                fontWeight: "bold",
                border: "2px solid rgb(149 149 149 / 28%)",
                boxShadow: "#00000040 0px 0px 5px",
                zIndex: "1"
            }}>
            <span>{iconStatus()}{authUser.Name}</span>
        </motion.div >
            <div id="applicationHeader">
                <header id="appHeader">
                    <span id="appName" onClick={() => navigate('/home')} style={{ cursor: "pointer" }}>
                        <img src="/Trellis.com.png" alt="Trellis" />
                    </span>
                    <ul id="navUl">
                        <li style={locationHandler('/home')}
                            onClick={() => navigate('/home')}
                        >Home</li>
                        <li style={locationHandler('/todos')}
                            onClick={() => navigate('/todos')}
                        >Todos</li>
                        <li style={locationHandler('/about')}
                            onClick={() => navigate('/about')}
                        >About</li>
                        <li id="loginLi" style={locationHandler('/login')}
                            onClick={() => navigate('/login')}
                        >{loginStatus()}</li>
                        <li style={locationHandler('/signin')}
                            onClick={() => navigate('/signin')}
                        >Sign-in</li>
                    </ul>
                </header>
            </div>
        </>
    )
}
export default Header;