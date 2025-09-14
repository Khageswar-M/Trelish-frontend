import { Button } from "bootstrap";
import { motion } from "framer-motion";
import { useAuth } from "../Services/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigator = useNavigate();
    const { authUser,
            setAuthUser,
            isLoggedIn,
            setIsLoggedIn,
            userId,
            setUserId } = useAuth();


    const handleOnClick = () => {
        if(isLoggedIn){
            navigator('/todos');
        }else{
            navigator('/signin');
        }
    }
    return (
        <>
            {/* Hero section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                id="heroSection"
            >
                <h2 id="heroHeader">Organize Your Tasks Effortlessly</h2>
                <p id="heroPara">
                    Stay productive and focused with Trellis. Manage your to-dos, plan your day,
                    and achieve your goals with a clean and minimal interface.
                </p>
                <motion.button className="btn btn-danger" id="heroButton"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOnClick()}
                    style={{display: "flex"}}
                >
                    <i className="bi bi-circle-fill" style={{fontSize: "1.2rem",color: "#930000"}} ></i>Get Started
                </motion.button>

                <motion.div id="heroCardContainer">
                    {
                        [
                            { title: "Fast & Intuitive", desc: "Easily create and manage tasks with a clean interface." },
                            { title: "Stay Organized", desc: "Keep track of deadlines, priorities, and progress." },
                            { title: "Accessible Anywhere", desc: "Your tasks sync seamlessly across all devices." },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                            >
                                <motion.div id="heroCard" style={{backgroundColor: "#0b0d15"}}>
                                    <h3  id="heroCardHead">{feature.title}</h3>
                                    <p id="heroCardPara">{feature.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))
                    }
                </motion.div>


            </motion.section>
        </>
    )
}
export default Home;