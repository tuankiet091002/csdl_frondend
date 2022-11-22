import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      	req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

  
export const fetchEmps = () => pass;
export const createEmp = (newEmp) => pass; 
export const deleteEmp = (id) => pass;


export const register = (formData) => API.post('auth/register', formData);
export const login = (formData) => API.post('auth/login', formData);