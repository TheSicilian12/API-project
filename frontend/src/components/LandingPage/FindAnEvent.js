import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import eventImage from '../assets/Images/Daco_1979729.png';

function FindAnEvent() {
    return (
        <div className='landingPage_findEvent displayFlex flex-directionColumn alignCenter borderBlack'>
            <img className='borderRed'
                        src={eventImage}
                        alt="test image"
                        width='50%'
                        />
            <NavLink className='landingPage_findEvent_mainText borderRed' to='/events'>
                Find an event
            </NavLink>
            <p className='landingPage_findEvent_additionalText'>
                additional text
            </p>
        </div>
    )
}

export default FindAnEvent;
