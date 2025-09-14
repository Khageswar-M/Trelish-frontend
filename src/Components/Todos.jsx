import { Await, useLocation } from "react-router-dom";
import { todosByUserId, deleteTodoById, updateTodoById, createTodoByUserid } from "../Services/TodoServices";
import { useEffect, useState, useRef } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../Services/AuthContext";

import Sortable from 'sortablejs';


const Todos = () => {
    const navigator = useNavigate();
    const [isLoged, setLoged] = useState(false);

    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);


    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [hoveredRow, setHoveredRow] = useState(null);

    const { authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId } = useAuth();
        
    const formRef = useRef(null);

    


    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            allTodos();
        }
    }, [isLoggedIn]);

    const allTodos = async () => {
        try {
            const response = await todosByUserId(userId);
            const userIdTodos = response.data;
            setTodos(userIdTodos);
        } catch (error) {
            console.error('userId not found');
        }
    }

    const remove = async (todoId) => {
        try {
            const response = await deleteTodoById(todoId);
            setTodos((prev) => prev.filter((t) => t.id !== todoId));
        } catch (error) {
            console.error(error);
        }
    }

    const editTodo = (todoId) => {
        const updating = todos.find((i) => i.id === todoId);
        if (updating) {
            setTitle(updating.title);
            setDescription(updating.description);
            setPriority(updating.priority);
            setStatus(updating.status);
            setDueDate(updating.dueDate);
            setEditId(todoId);

        }
    }



    const saveOrupdate = () => {
        if (!isLoggedIn) {
            return;
        }

        if (dueDate === '') {
            setDueDate(new Date().toISOString().split('T')[0]);
        }
        const todo = { title, description, status, priority, dueDate };
        if (editId) {
            try {
                updateTodoById(editId, todo)
                    .then(response => {
                        allTodos();
                        setEditId(null);
                    }).catch(error => {
                        console.error(error);
                    })
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                createTodoByUserid(userId, todo)
                    .then((response) => {
                        allTodos();
                    }).catch(error => {
                        console.error(error);
                    });

            } catch (error) {
                console.error(error);
            }


        }
    }

    const editOrAdd = () => {
        if (editId) {
            return 'Edit Todo';
        } else {
            return 'Add Todo';
        }
    }

    const priorityAndStatus = (ps) => {
        switch (ps) {
            case ('Low'):
                return (
                    <span id="low">
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.8rem", color: "hsl(111 100% 16% / 1)" }} ></i>Low
                    </span>
                );
            case ('Medium'):
                return (
                    <span id="medium">
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.8rem", color: "hsl(67 100% 16% / 1)" }} ></i>Medium
                    </span>);
            case ('High'):
                return (
                    <span id="high">
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.8rem", color: "hsl(11 100% 16% / 1)" }} ></i>High
                    </span>);
            case ('Pending'):
                return (
                    <span id="pending">
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.8rem", color: "hsl(0deg 0% 22%)" }} ></i>Pending
                    </span>);
            case ('In progress'):

                return (
                    <span id="inprogress">
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.8rem", color: "hsl(232.23deg 100% 59.64%" }} ></i>In progress
                    </span>);
            case ('Completed'):
                return (
                    <span id="completed">
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.8rem", color: "hsl(119.06deg 100% 50%)" }} ></i>Completed
                    </span>);
            default:
                return 'Something went wrong!'
        }
    }

    const setStyling = (len) => {
        const l = len.length;
        switch (true) {
            case (l >= 15):
                return 300;
            case (l >= 13):
                return 250;
            case (l >= 11):
                return 200;
            case (l >= 9):
                return 150;
            case (l >= 7):
                return 100;
            case (l >= 5):
                return 330;
            case (l >= 0):
                return 350;
            default:
                console.error("Something went wrong!");
        }
    }

    //function to restrict the date input
    const handleDateInput = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }



    const [isClicked, setIsClicked] = useState(false);
    // add api accordingly
    const formController = () => {
        if (formRef.current && isClicked) {
            formRef.current.classList.remove("border-blink");
            void formRef.current.offsetWidth;
            formRef.current.classList.add("border-blink");
            setIsClicked(false);
        }
        return (
            <div id="formControl" ref={formRef} style={{ border: "2px solid transparent" }}>
                <form id="controlForm" >
                    <h1 id="formPurpose" style={{ color: "gray" }}>{editOrAdd()}</h1>
                    <div id="forTitle">
                        {/* <label htmlFor="controlTitle">Title</label><br /> */}
                        <input
                            placeholder="Enter title"
                            className="form-control"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            maxLength={15}
                            id="controlTitle"
                            required
                        />
                    </div>

                    <div id="forDescription">
                        {/* <label htmlFor="controlDescription">Description</label><br /> */}
                        <input
                            placeholder="Enter description"
                            className="form-control"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            maxLength={50}
                            id="controlDescription"
                            required
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
                        <div id="forPriority">
                            <label style={{ color: "gray" }} htmlFor="controlPriority">Priority</label><br />
                            <select
                                className="form-select"
                                id="controlPriority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div id="forStatus">
                            <label style={{ color: "gray" }} htmlFor="controlStatus">Status</label><br />
                            <select
                                className="form-select"
                                id="controlStatus"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div id="forDeuDate">
                        <label style={{ color: "gray" }} htmlFor="controlDueDate">Due date</label><br />
                        <input
                            className="form-control"
                            type="date"
                            id="controlDueDate"
                            min={handleDateInput()}
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}

                        />
                    </div>

                    <div id="submitControl">
                        <button
                            className="btn btn-outline-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                saveOrupdate();
                            }}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        )

    }

    const tbodyRef = useRef(null);
    useEffect(() => {
        if (tbodyRef.current) {
            new Sortable(tbodyRef.current, {
                animation: 150,
                handle: '.drag-handle',
                dragClass: 'rounded-none!',
                onEnd: (evt) => {
                    const newOrder = Array.from(tbodyRef.current.children).map(row => row.dataset.id);
                    localStorage.setItem("todosOrder", JSON.stringify(newOrder));
                }
            })
        }
    }, [])

    //function to handle 'createdAt data'
    const handleCreatedAt = (createdAt) => {
        if (!createdAt) return "";

        const isoDate = createdAt.split("T")[0];
        if (!isoDate) return "";

        const [year, month, day] = isoDate.split("-");

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
        const monthName = monthNames[parseInt(month, 10) - 1];

        return `${day}-${monthName}-${year}`;

    }

    return (
        <>{
            !isLoggedIn &&
            <motion.div
                id="loginWarning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <p className="font-medium">
                    Hi there!<br />
                    You need to Login to continue. Don’t worry, it only takes a moment.
                </p>
                <motion.button

                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        backgroundColor: "#006097",
                        padding: "5px 20px",
                        fontWeight: "bold",
                        borderRadius: "10px"
                    }}
                    onClick={() => navigator('/login')}
                >
                    Goto Login page
                </motion.button>
            </motion.div >
        }
            <div id="formControlerContainer">
                {
                    formController()
                }
            </div>
            <div id="todoList"
                className="hover-scroll-y"
            >
                <table>
                    <thead>
                        <tr>
                            <th style={{ border: "none" }}></th>
                            <th style={{padding: "0px 3px"}}><i className="bi bi-layers"> Sl. No</i></th>
                            <th><i className="bi bi-caret-down"></i>Title</th>
                            <th style={{
                                width: "15%"
                            }}><i className="bi bi-file-text"></i>Description</th>
                            <th><i className="bi bi-calendar"></i>Created</th>
                            <th><i className="bi bi-bar-chart"></i>Priority</th>
                            <th><i className="bi bi-rocket"></i>Status</th>
                            <th ><i className="bi bi-calendar-check"></i>Due date</th>
                            <th style={{ padding: "2px"}}><i className="bi bi-chat-right-text"></i>Edit</th>
                            <th style={{ padding: "2px" }}><i className="bi bi-database-dash"></i>Delete</th>
                        </tr>
                    </thead>
                    <tbody ref={tbodyRef}>
                        {loading && isLoggedIn ? (
                            Array.from({ length:  7 }).map((_, i) => (
                                <tr
                                    key={i}
                                    className="animate-pulse"
                                >
                                    <td colSpan={9}>
                                        <div className="flex flex-col space-y-2">
                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48" style={{
                                                width: "100%",
                                                height: "35px",
                                                borderRadius: "0px"
                                            }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            todos.slice().sort((a, b) => {
                                if (a.status === "Completed" && b.status !== "Completed") return -1;
                                if (a.status !== "Completed" && b.status === "Completed") return 1;
                                return 0;
                            }).map((t, index) => (
                                <tr key={t.id} 
                                    data-id={t.id}
                                    onMouseOver={() => setHoveredRow(t.id)}
                                    onMouseOut={() => setHoveredRow(null)}
                                    className="drag-handle"
                                >
                                    <td  id="draggedTd"
                                        style={{
                                            opacity: hoveredRow === t.id ? 1 : 0,
                                        }}
                                    >
                                        <svg className="shrink-0 size-4 ms-auto text-gray-400 dark:text-neutral-500 cursor-grab" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="9" cy="12" r="1"></circle>
                                            <circle cx="9" cy="5" r="1"></circle>
                                            <circle cx="9" cy="19" r="1"></circle>
                                            <circle cx="15" cy="12" r="1"></circle>
                                            <circle cx="15" cy="5" r="1"></circle>
                                            <circle cx="15" cy="19" r="1"></circle>
                                        </svg>
                                    </td>
                                    <td style={{textAlign: "center"}}><span>{index + 1}.</span></td>
                                    <td><span style={{
                                        backgroundColor: `hsl(${setStyling(t.title)} 50% 25%)`
                                    }}>{t.title}</span></td>
                                    <td><span style={{
                                        backgroundColor: `hsl(${setStyling(t.description) - 20} 70% 25%)`
                                    }}>{t.description}</span></td>
                                    <td><span className="day-font">{handleCreatedAt(t.createdAt)}</span></td>
                                    <td><span>{priorityAndStatus(t.priority)}</span></td>
                                    <td><span>{priorityAndStatus(t.status)}</span></td>
                                    <td><span className="day-font">{handleCreatedAt(t.dueDate)}</span></td>
                                    <td >
                                        <button
                                            onClick={() => {
                                                editTodo(t.id);
                                                setIsClicked(true);
                                            }}
                                            className="btn btn-outline-primary"
                                            id="editBtn"
                                        >
                                            <i className="bi bi-pen"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => remove(t.id)}
                                            className="btn btn-outline-danger"
                                            id="deleteBtn"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>

                            ))
                        )}
                    </tbody>

                </table>



            </div>
            <div id="addButton">

                <button
                    id="createNewTodo"
                    className="btn btn-success"
                    onClick={() => {
                        formController();
                        setIsClicked(true);
                        setEditId(null);
                    }
                    }
                >
                    <span><i className="bi bi-database-add"></i>Add Todo</span>
                </button>
            </div>
        </>
    )
}

export default Todos;