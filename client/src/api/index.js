import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchEmps = () => API.get('/emps');
export const createEmp = (newEmp) => API.post('/emps', newEmp);
export const deleteEmp = (id) => API.delete(`/emps/${id}`);



export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);