import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEmps, getEmpsBySearch } from "../../actions/empsAction";
import { useSelector } from 'react-redux';
import Employee from './Employee/Employee.js'

const Employees = () => {
    const initialState = {name: '', role: ''};
    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEmps());
	  }, [dispatch]);

    const emps = useSelector((state) => state.emps);
    const [searchQuery, setSearchQuery] = useState(initialState)

    useEffect(() => {
        dispatch(getEmpsBySearch(searchQuery));   
    }, [searchQuery])

    const handleChange = (e) => {
        setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value});
        
    }
    const clear = () => {
        setSearchQuery(initialState);
    }
    
    return (
    <>
        <h1>Employees List</h1>
        <div class="input-group mb-3" style={{width:"50vw"}}>
        <input type="text" class="form-control" name="name" value={searchQuery.search} onChange={handleChange}/>
            <div class="input-group-append">
                <span class="input-group-text"><i class="bi bi-x" role="button" onClick={clear}/></span>
            </div>
        </div>
        {!emps.length ? <div class="spinner-border" role="status"/> :
        <ul class="list-group" style={{width:"50vw"}}>
            {emps.map((emp) => <Employee emp={emp} key={emp._id}/>)}
        </ul>}     
    </>)
};

export default Employees;