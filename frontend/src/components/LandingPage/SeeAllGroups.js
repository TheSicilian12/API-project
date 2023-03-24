import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SeeAllGroups.css';
import './LandingPage.css';
import groupImage from '../assets/Images/favpng_marceline-the-vampire-queen-jake-the-dog-princess-bubblegum-cartoon-network-adventure.png';


function SeeAllGroups() {
    return (
            <div className='landingPage_groups displayFlex flex-directionColumn alignCenter borderBlack'>
                <img className='borderRed'
                        src={groupImage}
                        alt="test image"
                        width='50%'
                        />
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
