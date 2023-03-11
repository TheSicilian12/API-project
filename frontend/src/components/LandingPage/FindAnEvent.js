import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './FindAnEvent.css';

function FindAnEvent() {
    return (
        <div className='landingPage_findEvent'>
            <img classNameclassName='landingPage_findEvent_img'></img>
            <NavLink className='landingPage_findEvent_mainText' to='/events'>
                Find an event
            </NavLink>
            <p className='landingPage_findEvent_additionalText'>
                additional text
            </p>
        </div>
    )
}

export default FindAnEvent;
