import React from 'react';
import { deleteTrn } from '../../../actions/trnsAction';
import { useDispatch } from 'react-redux';

const Trainee = ({trn}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTrn(trn._id));
    }

    return (
    <tr>
        <td>{trn.SSN}</td>
        <td>{trn.FNAME} {trn.LNAME}</td>
        <td>{trn.PHONE}</td>
        <td>{trn.ADDRESS}</td>
    </tr>
    )
};



export default Trainee;