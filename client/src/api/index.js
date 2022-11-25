import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });
const accessHeader = {withCredentials: true, headers: {'Access-Control-Allow-Origin': 'http://localhost'}}
export const fetchEmps = () => API.get('/user', accessHeader);
export const fetchEmpsBySearch = (searchQuery) => API.get(`/user?tag=${searchQuery.role}&name=${searchQuery.name}`,accessHeader);
export const deleteEmp = (userID) => API.delete(`/user/${userID}`, accessHeader);


export const register = (formData) => API.post('auth/register', formData, accessHeader);
export const login = (formData) => API.post('auth/login', formData, accessHeader);
export const logout = () => API.get('auth/logout', accessHeader);