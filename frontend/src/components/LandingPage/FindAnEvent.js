import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import eventImage from '../assets/Images/Daco_1979729.png';

function FindAnEvent() {

    return (
        <NavLink
        className='landingPage_findEvent_mainText pointerCursor noDecoration' to='/events'>
            <div
            className='landingPage_findEvent displayFlex flex-directionColumn alignCenter pointerCursor'>
                <img className=''
                    src={eventImage}
                    alt="test image"
                    width='50%'
                />
                <h2 className='color'>
                Find an event
                </h2>
                {/* <p className='landingPage_findEvent_additionalText'>
                    additional text
                </p> */}
            </div>
        </NavLink>
    )
}

export default FindAnEvent;
