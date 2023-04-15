import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LandingPage.css';
import '../UniversalCSS.css';
import eventImage from '../assets/Images/Daco_1979729.png';

function FindAnEvent() {

    return (
        <NavLink
        className='landingPage_findEvent_mainText pointerCursor enable section3Container borderGreen' to='/events'>
            <div
            className='landingPage_findEvent displayFlex flex-directionColumn alignCenter pointerCursor'>
            <div
                className='imageContainer displayFlex alignCenter justifyCenter borderRed'
            >
                <img className='borderRed'
                    src={eventImage}
                    alt="test image"
                    width='100%'
                    />
                </div>
                <h2>
                Find an event
                </h2>
                <p className='landingPage_findEvent_additionalText textWrapCenter justifyCenter moveUp'>
                    Adventues are happening for just about any specialty you can thiunk of. From dungeon diving and herb gathering to skill training and espionage.
                </p>
            </div>
        </NavLink>
    )
}

export default FindAnEvent;
