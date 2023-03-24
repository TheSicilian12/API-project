import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SeeAllGroups.css';
import './LandingPage.css';

function SeeAllGroups() {
    return (
            <div className='landingPage_groups borderBlack'>
                <img classNameclassName='landingPage_groups_img'></img>
                <NavLink className='landingPage_groups_mainText' to='/groups'>
                See all groups
                </NavLink>
                <p className='landingPage_groups_additionalText'>
                additional text
                </p>
            </div>
    )
}

export default SeeAllGroups;
