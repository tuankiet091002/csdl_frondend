import React from 'react';
import { useSelector } from 'react-redux';
import Employee from './Employee/Employee.js'

const Employees = () => {
    const emps = useSelector((state) => state.emps);
    return (
    <>
        <h1>Employees List</h1>
        {!emps.length ? <div class="spinner-border" role="status"/> :
        <ul class="list-group" style={{width:"50vw"}}>
            {emps.map((emp) => <Employee emp={emp} />)}
        </ul>}
        
    </>)
};

export default Employees;