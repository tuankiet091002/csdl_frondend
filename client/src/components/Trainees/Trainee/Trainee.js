import React from 'react';
import { deleteTrn } from '../../../actions/trnsAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Trainee = ({trn}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch(deleteTrn(trn._id));
    }

    const goDetail = () => {
        navigate(`/${trn.SSN}`);
    }

    return (
    <tr>
        <td role="button" onClick={goDetail}>{trn.SSN}</td>
        <td role="button" onClick={goDetail}>{trn.FNAME} {trn.LNAME}</td>
        <td role="button" onClick={goDetail}>{trn.PHONE}</td>
        <td role="button" onClick={goDetail}>{trn.ADDRESS}</td>
        <td><button class="btn btn-danger"><i class="bi bi-trash-fill"/></button></td>
    </tr>
    )
};



export default Trainee;