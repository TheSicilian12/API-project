import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FindAnEvent from './FindAnEvent';
import SeeAllGroups from './SeeAllGroups';
import StartGroup from './StartGroup';
import './LandingPage.css';
import flowerImage from '../assets/Images/Example.jpg';
import landingPageInfo from '../assets/Images/pngfind.com-hora-de-aventura-png-6738376.png';

function LandingPage() {
    return (
        <>
            <div className='landingPage_intro borderRed displayFlex justifyCenter'>
                <div className='borderBlack displayFlex flex-directionColumn'>
                    <h1 className='textWrap borderRed'>
                        The people platform - Where skills become monster slaying, problem solving adventuring parties:
                    </h1>
                    <p className='textWrap borderRed'>
                        Whatever your skills, from heavy damage deeling and herbal remedies to political intrigue and assasinations,
                        there are thousands of people who could use your expertise on Adventureup.
                        Quests are happening every day—log in to join the adventure!
                    </p>
                </div>
                {/* <div className='displayFlex justifyCenter'> */}
                    <img className='borderGreen displayFlex'
                        src={landingPageInfo}
                        alt="test image"
                        width='20%'
                        />
                {/* </div> */}
            </div>
            <div className='landingPage_explaination borderBlack displayFlex justifyCenter'>
                How Meetup works: ...
            </div>
            <div className='borderGreen displayFlex justifyCenter'>
                <FindAnEvent />
                <SeeAllGroups />
                <StartGroup />
            </div>
            <div className='displayFlex justifyCenter'>
                <button className='landingPage_options_joinButton'>
                    Join Meetup
                </button>
            </div>
        </>
    )
}

export default LandingPage;
