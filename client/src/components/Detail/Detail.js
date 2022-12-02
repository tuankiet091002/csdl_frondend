import React, { useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  getTrnById, getTrnAchi } from "../../actions/trnsAction";



const Detail = () => {
    const {strn} = useSelector((state) => state.trns);
    const dispatch = useDispatch();
    const {id} = useParams();

	useEffect(() => {
        dispatch(getTrnById(id))
	}, [dispatch, id]);

    if (!strn) return null;
    
    return (
    <>
        <section id="about" class="container">
        <img src={strn.trainee[0].PHOTO}></img>
        <h1 class="display-4">{strn.person[0].FNAME} {strn.person[0].LNAME}</h1>
    </section>
    <section id="basic" class="container">
        <h1>Basic infomation</h1><hr/>
        <p>Birthdate: {(new Date(strn.trainee[0].DOB)).toLocaleDateString('vi-VN')}</p>
        <p>Address: {strn.person[0].ADDRESS}</p>
    </section>
    <section id="exp" class="container">
        <h1>Experience</h1>
        {strn.seasonTrainee.map((yearly) => 
            <div class="card">
                <div class="card-header collapse show" data-bs-toggle="collapse" data-bs-target="#exp1">
                    <div class="row">
                        <h5 class="col-10">Trainee year {yearly.SYEAR}</h5>
                        <em class="col-2">Apr 2012 - Current</em>
                    </div>
                </div>
                <div class="card-block collapse" id="exp1">
                    <p class="h5">Thí sinh</p>
                    <p>
                        Thông tin từng năm vào đây.
                    </p>
                </div>
            </div>
        )}
    </section>
    </>)
};

export default Detail;