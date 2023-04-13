import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SeeAllGroups.css';
import './LandingPage.css';
import groupImage from '../assets/Images/favpng_marceline-the-vampire-queen-jake-the-dog-princess-bubblegum-cartoon-network-adventure.png';


function SeeAllGroups() {
    return (
        <NavLink className='landingPage_groups_mainText pointerCursor noDecoration enable' to='/groups'>
            <div className='landingPage_groups displayFlex flex-directionColumn pointerCursor alignCenter'>
                <img className=''
                    src={groupImage}
                    alt="test image"
                    width='50%'
                />
                <h2>
                See all groups
                </h2>
                {/* <p className='landingPage_groups_additionalText'>
                    additional text
                </p> */}
            </div>
        </NavLink>
    )
}

export default SeeAllGroups;
