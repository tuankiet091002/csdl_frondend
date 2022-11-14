import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEmps } from "../../actions/empsAction";
import Employees from  "../Employees/Employees.js"
import EmpForm from  "../Employees/Form/EmpForm.js"

const Home = () => {
    const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getEmps());
	  }, [dispatch]);

    return (
    <>
    <div class="row-lg">
		<Employees />
	</div>
	<div class="row-lg">
		<EmpForm />
	</div>    
    </>
    )
}

export default Home;