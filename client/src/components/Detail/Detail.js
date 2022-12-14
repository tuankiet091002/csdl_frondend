import React, { useEffect } from 'react';
import './Detail.css';

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
    <div id="detail">
        <div class="image">
            <img class="ssn_img" src={strn.trainee[0].PHOTO}></img>
            <h1 class="display-4">{strn.person[0].FNAME} {strn.person[0].LNAME}</h1>
           
         </div>
                <div class="inf">
                    <p> {(new Date(strn.trainee[0].DOB)).toLocaleDateString('vi-VN')}</p>
                    <p>Live at {strn.person[0].ADDRESS}</p>
                    <p>Call by {strn.person[0].PHONE}</p>
                </div>
                <div id="inf">
                    <h1 id="exp">Experience</h1>
                    {strn.seasonTrainee.map((yearly) => 
                        <div class="card px-1" key={yearly.SYEAR}>
                            <div class="card-header collapse show" data-bs-toggle="collapse" data-bs-target="#exp1">
                                <div class="ex">
                                    <h5 class="year">Join in {yearly.SYEAR}</h5>
                                    <em class="time" >2021 - Current</em>
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
                                                            `???????c h???ng ${ep.RANK.RANK} ??? t???p ${ep.EP_NO} v???i ${ep.NO_OF_VOTES} vote` :
                                                            `D???ng l???i ??? t???p ${ep.EP_NO} v???i ${ep.NO_OF_VOTES} vote`
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
                </div>
    </div>
    </>
    )
};

export default Detail;