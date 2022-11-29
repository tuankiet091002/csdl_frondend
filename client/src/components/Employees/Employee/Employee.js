import React from 'react';
import { deleteEmp } from '../../../actions/empsAction';
import { useDispatch } from 'react-redux';

const Employee = ({emp}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteEmp(emp._id));
    }

    return (
    <tr>
        <td>{emp.COMPANY_ID}</td>
        <td>{emp.DOB}</td>
        <td>{emp.SSN}</td>
        <td>{emp.PHOTO}</td>
    </tr>
    )
};



export default Employee;