import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StartGroup.js';
import './LandingPage.css';
import startGroupImage from '../assets/Images/Daco_6030033.png';


function StartGroup() {
    return (
        <NavLink to='/groups/new' className='landingPage_startGroup_mainText'>
            <div className='landingPage_startGroup displayFlex flex-directionColumn alignCenter borderBlack'>
                <img className='borderRed'
                    src={startGroupImage}
                    alt="test image"
                    width='50%'
                />
                Start a new group
                {/* <p className='landingPage_startGroup_additionalText'>
                    additional text
                </p> */}
            </div>
        </NavLink>
    )
}

export default StartGroup;
