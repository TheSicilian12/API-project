import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StartGroup.js';
import './LandingPage.css';
import startGroupImage from '../assets/Images/Daco_6030033.png';

function StartGroup({ user }) {

    let linkSwitch = 'enable';
    if (!user) {
        linkSwitch = 'disable'
    }

    return (
        <NavLink to='/groups/new' className={`landingPage_startGroup_mainText pointerCursor ${linkSwitch}`}>
            <div className='landingPage_startGroup displayFlex flex-directionColumn pointerCursor alignCenter'>
                <img className=''

                    src={startGroupImage}
                    alt="test image"
                    width='50%'
                />
                <h2 className={linkSwitch}>
                    Start a new group
                </h2>
                {/* <p className='landingPage_startGroup_additionalText'>
                    additional text
                </p> */}
            </div>
        </NavLink>


    )
}

export default StartGroup;
