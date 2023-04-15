import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './SeeAllGroups.css';
import './LandingPage.css';
import '../UniversalCSS.css'
import groupImage from '../assets/Images/favpng_marceline-the-vampire-queen-jake-the-dog-princess-bubblegum-cartoon-network-adventure.png';


function SeeAllGroups() {
    return (
        <NavLink className='landingPage_groups_mainText pointerCursor enable section3Container' to='/groups'>
            <div className='landingPage_groups displayFlex flex-directionColumn pointerCursor alignCenter'>
                <div
                    className='imageContainer displayFlex alignCenter justifyCenter'
                >

                <img 
                    src={groupImage}
                    alt="test image"
                    width='100%'
                    />
                    </div>
                <h2>
                See all groups
                </h2>
                <p className='landingPage_groups_additionalText textWrapCenter justifyCenter moveUp'>
                    Do what you love and find your community. The rest is history!
                </p>
            </div>
        </NavLink>
    )
}

export default SeeAllGroups;
