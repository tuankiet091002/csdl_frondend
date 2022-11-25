import React from 'react';
import { deleteEmp } from '../../../actions/empsAction';
import { useDispatch } from 'react-redux';

const Employee = ({emp}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteEmp(emp._id));
    }

    return (
    <>
        <li class="list-group-item">
            Tên: {emp.name}     Role: {emp.role}
            <button class="btn btn-danger btn-sm ml-auto" type="button" onClick={handleDelete} style={{float: "right"}}>
            <i class="bi bi-trash"></i></button>
        </li>
    </>)
};

export default Employee;