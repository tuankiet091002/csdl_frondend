
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {createTrainee} from "../../../actions/trnsAction";
import './pop.css'
const TraineeForm = ({closeForm}) => {    
    const dispatch = useDispatch();
    
    const initialState = {SSN: '', Fname: '', Lname: '', address: '', 
                        phone: '', DoB: '', photo: '', company_ID: ''}

    const [formData, setForm] = useState(initialState);
    const [err, setErr] = useState(''); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const t = new Date(formData.DoB);
        dispatch(createTrainee({...formData, DoB: t.toLocaleDateString('vi-VN')}))
        .then(()=>{
            clearForm();
            closeForm();
        })
        .catch((error)=>{
            setErr(error.response.data.msg);
        });

 }

    const handleChange = (e) => {
        setForm({...formData, [e.target.name]: e.target.value || e.value});
    }

    const clearForm = () => {
        setForm(initialState);
    };

    return (
    <>
    <section class="Form2">
        <p class="h2 text-center">Trainee's Information</p>
        <form autoComplete='off' onSubmit={handleSubmit}>
            <div id="popu" class="row">
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
                <label htmlFor="dob">Birthdate</label>
                <input type="date" class="form-control" id="dob"
                name="DoB" value={formData.DoB} onChange={handleChange}/>
            </div>

            <div class="form-group">
                <input type="text" class="form-control" id="ssn" required name="SSN" value={formData.SSN} onChange={handleChange} />
                <span htmlFor="ssn" id="lab"><i class="fa fa-user"></i> SSN</span>
            </div>
            
            <div class="form-group">
                <input type="text" class="form-control" id="address" 
                name="address" value={formData.address} onChange={handleChange} required/>
                <span htmlFor="ssn" id="lab"><i class="fa fa-location-dot"></i> Address</span>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="phone" 
                name="phone" value={formData.phone} onChange={handleChange} required/>
                <span htmlFor="ssn" id="lab"><i class="fa fa-phone"></i> Phone</span>
            </div>
            
            <div class="form-group">
                <input type="text" class="form-control" id="photo" 
                name="photo" value={formData.photo} onChange={handleChange} required/>
                <span htmlFor="photo" id="lab"><i class="fa fa-image"></i> Photo Link</span>
            </div>
            <div class="form-group">
                
                <select class="form-control" id="com" required
                name="company_ID" onChange={handleChange}>
                    <option></option>
                    <option value="C465">Eco Focus</option>
                    <option value="C932">Innovation Arch</option>
                    <option value="C423">Strat Security</option>
                    <option value="C254">Inspire Fitness Co</option>
                </select>
                <span htmlFor="com" id="lab"><i class="fa-solid fa-building"></i> Company</span>
            </div>
            <br/>
            {err ? <div class="text-danger my-3">{err}</div> : <></>}
    
     
                <button type="submit" class="btn btn-primary" mt-3 mb-5>Submit <i class="fa fa-paper-plane"></i></button>
          
            <button type="reset" class="btn btn-danger" onClick={clearForm}>Clear <i class="fa-solid fa-trash"></i></button>
        
        
        </form>
    </section>
    </>
    );
}

export default TraineeForm;