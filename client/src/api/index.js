import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });
axios.defaults.withCredentials = true;

export const fetchEmps = () => pass;
export const createEmp = (newEmp) => pass; 
export const deleteEmp = (id) => pass;


export const register = (formData) => API.post('auth/register', formData);
export const login = (formData) => API.post('auth/login', formData);
export const logout = () => API.get('auth/logout');