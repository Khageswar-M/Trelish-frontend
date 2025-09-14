import { motion } from 'framer-motion';
import { useAuth } from '../Services/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
const About = () => {
    const navigator = useNavigate();
    const { authUser,
            setAuthUser,
            isLoggedIn,
            setIsLoggedIn,
            userId,
            setUserId } = useAuth();

    const onClickHandler = () => {
        if(isLoggedIn){
            return navigator('/todos');
        }else{
            return navigator('/signin');
        }
    }

    return (
        <>
            <motion.div id='aboutSection'>

                <motion.div id='leftContent'
                    initial={{opacity:0, x: -50}}
                    animate={{opacity:1, x:0}}
                    transition={{duration: 0.8}}
                    onClick={() => navigator('/home')}
                >
                    <img src="./Trellis.com.png" alt="Trellis" width="100%" />
                </motion.div>

                <motion.div id='rightContent' style={{ lineHeight: "2" }}
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    <h1 style={{ fontSize: "3.5rem" }}>
                        About <span style={{ color: "#109aff" }}>Trellis</span>
                    </h1>
                    <p>
                        Trellis is a smart and elegant task management platform designed to help you
                        stay productive and organized. Whether you’re a student, a professional, or a
                        team, Trellis empowers you to create, track, and complete tasks seamlessly.
                    </p>
                    <ul>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <span>Minimal & distraction-free interface</span>
                        </li>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <span>Real-time sync across devices</span>
                        </li>
                        <li>
                            <i className="bi bi-check2-circle"></i>
                            <span>Customizable workflows & priorities</span>
                        </li>
                    </ul>
                    <motion.button 
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                        style={{
                            backgroundColor: "#109aff",
                            padding: "3px 15px",
                            fontSize:"1.3rem",
                            borderRadius:"30px"
                        }}
                        onClick={() => onClickHandler()}
                    >
                        <i className="bi bi-circle-fill" style={{fontSize: "1.2rem",color: "#005fd0"}} ></i>Get started
                    </motion.button>
                </motion.div>

            </motion.div>

        </>
    )
}
export default About;