import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StartGroup.js';
import './LandingPage.css';
import '../UniversalCSS.css';
import startGroupImage from '../assets/Images/Daco_6030033.png';

function StartGroup({ user }) {

    let linkSwitch = 'enable';
    if (!user) {
        linkSwitch = 'disable'
    }

    return (
        <NavLink to='/groups/new' className={`landingPage_startGroup_mainText pointerCursor section3Container ${linkSwitch}`}>
            <div className='landingPage_startGroup displayFlex flex-directionColumn pointerCursor alignCenter'>
            <div className='imageContainer displayFlex alignCenter justifyCenter'>

                <img
                    src={startGroupImage}
                    alt="test image"
                    width='100%'
                    />
            </div>
                <h2 >
                    Start a new group
                </h2>
                <p className='landingPage_startGroup_additionalText textWrapCenter justifyCenter moveUp'>
                    You don't have to be an expert guild leader to gather people together and have an adventure.
                </p>
            </div>
        </NavLink>


    )
}

export default StartGroup;
