
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {createTrainee} from "../../../actions/trnsAction";

const TraineeForm = ({closeForm}) => {    
    const dispatch = useDispatch();
    
    const initialState = {SSN: '', Fname: '', Lname: '', address: '', 
                        phone: '', DoB: '', photo: '', company_ID: ''}

    const [formData, setForm] = useState(initialState);
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const t = new Date(formData.DoB);
        dispatch(createTrainee({...formData, DoB: t.toLocaleDateString('vi-VN')}));
        clearForm();
        closeForm();
    }

    const handleChange = (e) => {
        setForm({...formData, [e.target.name]: e.target.value || e.value});
    }

    const clearForm = () => {
        setForm(initialState);
    };

    return (
    <>
        <p class="h1 text-center">Add Trainee</p>
        <form autoComplete='off' onSubmit={handleSubmit}>
            <div class="form-group">
                <label htmlFor="ssn">SSN</label>
                <input type="text" class="form-control" id="ssn" 
                name="SSN" value={formData.SSN} onChange={handleChange}/>
            </div>
            <div class="row">
                <div class="form-group col-6">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" class="form-control" id="fname" 
                    name="Fname" value={formData.Fname} onChange={handleChange}/>
                </div>
                <div class="form-group col-6">
                <label htmlFor="lname">Last Name</label>
                    <input type="text" class="form-control col" id="lname" 
                    name="Lname" value={formData.Lname} onChange={handleChange}/>
                </div>  
            </div>
            <div class="form-group">
                <label htmlFor="ssn">Address</label>
                <input type="text" class="form-control" id="address" 
                name="address" value={formData.address} onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="ssn">Phone</label>
                <input type="text" class="form-control" id="phone" 
                name="phone" value={formData.phone} onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="dob">Birthdate</label>
                <input type="date" class="form-control" id="dob"
                name="DoB" value={formData.DoB} onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="photo">Photo Link</label>
                <input type="text" class="form-control" id="photo" 
                name="photo" value={formData.photo} onChange={handleChange}/>
            </div>
            <div class="form-group">
                <label htmlFor="com">Company</label>
                <select class="form-control" id="com" 
                name="company_ID" onChange={handleChange}>
                    <option></option>
                    <option value="C465">Eco Focus</option>
                    <option value="C932">Innovation Arch</option>
                    <option value="C423">Strat Security</option>
                    <option value="C254">Inspire Fitness Co</option>
                </select>
            </div>
            <br/>
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-danger mx-3" onClick={clearForm}>Clear</button>
        </form>
    </>
    );
}

export default TraineeForm;