import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StartGroup.js';

function StartGroup() {
    return (
        <div className='landingPage_startGroup'>
            <img classNameclassName='landingPage_startGroup_img'></img>
            <h3 className='landingPage_startGroup_mainText'>
                Start a new group
            </h3>
            <p className='landingPage_startGroup_additionalText'>
                additional text
            </p>
        </div>
    )
}

export default StartGroup;
