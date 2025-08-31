import { Await, useLocation } from "react-router-dom";
import { todosByUserId, deleteTodoById, updateTodoById, createTodoByUserid, getUserId } from "../Services/TodoServices";
import { useEffect, useState } from "react";

import { useAuth } from "../Services/AuthContext";

const Todos = () => {
    const location = useLocation();
    const [isLoged, setLoged] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);


    const [todos, setTodos] = useState([]);


    const { authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId } = useAuth();


    // const [userId, setUserId] = useState(() => {
    //     const storedAuth = localStorage.getItem("authData");
    //     return storedAuth ? JSON.parse(storedAuth).userId : null;
    // });

    useEffect(() => {
        if (isLoggedIn) {
            allTodos();
        }
    }, [isLoggedIn]);

    const allTodos = async () => {
        try {
            const response = await todosByUserId(userId);
            const userIdTodos = response.data;
            console.log(userIdTodos);
            setTodos(userIdTodos);
        } catch (error) {
            console.error('userId not found');
        }
    }

    const remove = async (todoId) => {
        try {
            const response = await deleteTodoById(todoId);
            setTodos((prev) => prev.filter((t) => t.id !== todoId));
            console.log(response.data);
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
        if (dueDate === '') {
            setDueDate(new Date().toISOString().split('T')[0]);
        }
        const todo = { title, description, status, priority, dueDate };
        if (editId) {
            updateTodoById(editId, todo)
                .then(response => {
                    console.log(response.data);
                    allTodos();
                    setEditId(null);
                }).catch(error => {
                    console.error(error);
                })



        } else {
            createTodoByUserid(userId, todo)
                .then((response) => {
                    console.log(response.data)
                    allTodos();
                }).catch(error => {
                    console.error(error);
                });

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
                return <span id="low">🟢Low</span>;
                break;
            case ('Medium'):
                return <span id="medium">🟡Medium</span>;
                break;
            case ('High'):
                return <span id="high">🔴High</span>;
                break;
            case ('Pending'):
                return <span id="pending">⬛Pending</span>;
                break;
            case ('In progress'):
                return <span id="inprogress">🟧In progress</span>;
                break;
            case ('Completed'):
                return <span id="completed">🟦Completed</span>;
                break;
            default:
                return 'Something went wrong!'
        }
    }

    const setStyling = (len) => {
        const l = len.length;
        switch (true) {
            case (l >= 15):
                return 300;
            // backgroundColor: "hsl(300, 50%, 50%)"
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


    // add api accordingly
    const formController = () => {

        return (
            <div id="formControl">
                <form id="controlForm">
                    <h1 id="formPurpose">{editOrAdd()}</h1>
                    <div id="forTitle">
                        <label htmlFor="controlTitle">Title</label><br />
                        <input
                            placeholder="Enter title"
                            className="form-control"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            maxLength={15}
                            id="controlTitle"
                        />
                    </div>

                    <div id="forDescription">
                        <label htmlFor="controlDescription">Description</label><br />
                        <input
                            placeholder="Enter description"
                            className="form-control"
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            maxLength={50}
                            id="controlDescription"
                        />
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div id="forPriority">
                            <label htmlFor="controlPriority">Priority</label><br />
                            <select
                                className="form-select"
                                id="controlPriority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Low">🟢Low</option>
                                <option value="Medium">🟡Medium</option>
                                <option value="High">🔴High</option>
                            </select>
                        </div>

                        <div id="forStatus">
                            <label htmlFor="controlStatus">Status</label><br />
                            <select
                                className="form-select"
                                id="controlStatus"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Pending">⚫Pending</option>
                                <option value="In Progress">🔵In progress</option>
                                <option value="Completed">🟣Completed</option>
                            </select>
                        </div>
                    </div>
                    <div id="forDeuDate">
                        <label htmlFor="controlDueDate">Due date</label><br />
                        <input
                            className="form-control"
                            type="date"
                            id="controlDueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}

                        />
                    </div>

                    <div id="submitContrl">
                        <button
                            className="btn btn-outline-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                saveOrupdate();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )

    }

    return (
        <>
            <div
                className="p-5 bg-image"
                style={{
                    backgroundImage: "url('https://wallpaperbat.com/img/870551-popular-abstract-wallpaper.jpg')",
                    height: "100vh",              // full viewport height
                    width: "100%",                // full width
                    backgroundSize: "cover",      // cover the entire area
                    backgroundPosition: "center", // center the image
                    backgroundRepeat: "no-repeat",// prevent tiling
                    position: "fixed",            // stick to screen even if scrolling
                    top: 0,
                    left: 0,
                    zIndex: 0
                }}
            ></div>
            <div id="formControlerContainer">
                {
                    formController()
                }
            </div>
            <div id="todoList">
                <table>
                    <thead>
                        <tr>
                            <th><i className="bi bi-caret-down"></i>Title</th>
                            <th style={{
                                width: "15%"
                            }}><i className="bi bi-file-text"></i>Description</th>
                            <th><i className="bi bi-calendar"></i>Created</th>
                            <th><i className="bi bi-bar-chart"></i>Priority</th>
                            <th><i className="bi bi-rocket"></i>Status</th>
                            <th ><i className="bi bi-calendar-check"></i>Due date</th>
                            <th style={{ padding: "2px" }}><i className="bi bi-chat-right-text"></i>Edit</th>
                            <th style={{ padding: "2px" }}><i className="bi bi-database-dash"></i>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((t) => {
                                return (
                                    <tr key={t.id}>
                                        <td><span style={{
                                            backgroundColor: `hsl(${setStyling(t.title)} 50% 50%)`
                                        }}>{t.title}</span></td>
                                        <td><span style={{
                                            backgroundColor: `hsl(${setStyling(t.description) - 20} 70% 20%)`
                                        }}>{t.description}</span></td>
                                        <td><span>{t.createdAt?.split("T")[0]}</span></td>
                                        <td><span>{priorityAndStatus(t.priority)}</span></td>
                                        <td><span>{priorityAndStatus(t.status)}</span></td>
                                        <td><span>{t.dueDate}</span></td>
                                        <td>
                                            <button
                                                onClick={() => editTodo(t.id)}
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

                                )

                            })
                        }
                    </tbody>

                </table>

                <div id="addButton">

                    <button
                        id="createNewTodo"
                        className="btn btn-outline-success"
                        onClick={() => {
                            formController();
                            setEditId(null);
                        }
                        }
                    >
                        <span><i className="bi bi-database-add"></i>Add</span>
                    </button>
                </div>

            </div>
        </>
    )
}

export default Todos;