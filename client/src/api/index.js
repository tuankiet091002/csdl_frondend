import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
const accessHeader = {withCredentials: true, headers: {'Access-Control-Allow-Origin': 'http://localhost'}}

export const fetchEmps = () => API.get('/', accessHeader);
export const fetchEmpsBySearch = (userID) => API.get(`/${userID}`,accessHeader);
export const deleteEmp = (userID) => API.delete(`/${userID}`, accessHeader);

export const login = (formData) => API.post('auth/login', formData, accessHeader);
export const logout = () => API.get('auth/logout', accessHeader)
