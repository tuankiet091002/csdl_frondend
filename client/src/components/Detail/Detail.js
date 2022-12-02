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
            <div class="card px-3" key={yearly.SYEAR}>
                <div class="card-header collapse show" data-bs-toggle="collapse" data-bs-target="#exp1">
                    <div class="row">
                        <h5 class="col-10">Trainee year {yearly.SYEAR}</h5>
                        <em class="col-2">2021 - Current</em>
                    </div>
                </div>
                <div class="card-text collapse" id="exp1">
                    <div class="card-body p-0">
                    <ul class="list-group list-group-flush">
                        {
                            yearly.ACHIEVEMENT.map((ep) => {
                                if (ep.NO_OF_VOTES) {
                                    return (
                                        <li class="list-group-item" key={ep.EP_NO}>
                                            { ep.RANK ?
                                                `Được hạng ${ep.RANK.RANK} ở tập ${ep.EP_NO} với ${ep.NO_OF_VOTES} vote` :
                                                `Dừng lại ở tập ${ep.EP_NO} với ${ep.NO_OF_VOTES} vote`
                                            }
                                        </li>)
                                }
                            })
                        }
                    </ul>
                    </div>
                </div>
            </div>
        )}
    </section>
    </>)
};

export default Detail;