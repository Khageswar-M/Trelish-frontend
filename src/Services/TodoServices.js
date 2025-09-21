import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL_DEV 
  : import.meta.env.VITE_API_URL_PROD;

export default BASE_URL;

export const UserLogin = (user) => axios.post(BASE_URL+'/login', user);

export const createTodoByUserid = (userId, todo) => axios.post(BASE_URL+`/users/${userId}/todos`, todo);

export const todosByUserId = (userId) => axios.get(BASE_URL+`/users/${userId}/todos`);

export const todoByTodoId = (todoId) => axios.get(BASE_URL+`/${todoId}`);

export const deleteTodoById = (todoId) => axios.delete(BASE_URL+`/${todoId}`);

export const updateTodoById = (todoId, todo) => axios.put(BASE_URL+`/${todoId}`, todo);

export const checkUserName = (user) => axios.get(BASE_URL+`/check?user=${user}`);

export const getUserId = ({email, password}) => axios.get(BASE_URL+`/get/userid?email=${email}&password=${password}`); 