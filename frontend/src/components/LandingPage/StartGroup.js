import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StartGroup.js';
import './LandingPage.css';
import startGroupImage from '../assets/Images/Daco_6030033.png';


function StartGroup() {
    return (
        <div className='landingPage_startGroup displayFlex flex-directionColumn alignCenter borderBlack'>
             <img className='borderRed'
                        src={startGroupImage}
                        alt="test image"
                        width='50%'
                        />
            <NavLink to='/groups/new'className='landingPage_startGroup_mainText'>
                Start a new group
            </NavLink>
            <p className='landingPage_startGroup_additionalText'>
                additional text
            </p>
        </div>
    )
}

export default StartGroup;
