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
            <div className='landingPage_intro displayFlex justifyCenter paddingMainTop'>
                <div className='displayFlex flex-directionColumn'>
                    <h1 className='textWrap'>
                        The people platform - Where skills become adventuring parties:
                    </h1>
                    <p className='textWrap'>
                        Whatever your skills, from heavy damage deeling and herbal remedies to political intrigue and assasinations,
                        there are thousands of people who could use your expertise on Adventureup.
                        Quests are happening every day—log in to join the adventure!
                    </p>
                </div>
                    <img className='displayFlex paddingInfoImageLeft'
                        src={landingPageInfo}
                        alt="test image"
                        width='25%'
                        />
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
