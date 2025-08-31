import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../Services/AuthContext";


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


    return (
        <>
            <div id="applicationHeader">
                <header id="appHeader">
                    <h1 id="appName">Trellis</h1>
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