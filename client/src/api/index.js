import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });
const accessHeader = {withCredentials: true, headers: {'Access-Control-Allow-Origin': 'http://localhost'}}

export const fetchTrns = () => API.get('trainee', accessHeader);
export const fetchTrnsBySearch = (query) => API.get(`trainee?name=${query}`,accessHeader);
export const deleteEmp = (userID) => API.delete(`trainee/${userID}`, accessHeader);

export const login = (formData) => API.post('auth/login', formData, accessHeader);
export const logout = () => API.get('auth/logout', accessHeader)
