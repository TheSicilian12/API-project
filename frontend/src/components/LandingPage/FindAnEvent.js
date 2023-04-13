import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import eventImage from '../assets/Images/Daco_1979729.png';

function FindAnEvent() {

    let decoration = 'noDecoration'


    return (
        <NavLink
        className={`landingPage_findEvent_mainText borderRed pointerCursor ${decoration}`} to='/events'>
            <div
            className='landingPage_findEvent displayFlex flex-directionColumn alignCenter borderBlack pointerCursor'>
                <img className='borderRed'
                    src={eventImage}
                    alt="test image"
                    width='50%'
                />
                <h2 className={`test`}>
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
