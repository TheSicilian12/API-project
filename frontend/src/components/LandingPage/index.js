import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FindAnEvent from './FindAnEvent';
import SeeAllGroups from './SeeAllGroups';
import StartGroup from './StartGroup';
import './LandingPage.css';

function LandingPage() {
    return (
       <>
        <div className='landingPage_intro'>
            The people platform - Where interests become friendships: ...
        </div>
        <div className='landingPage_explaination'>
            How Meetup works: ...
        </div>
        <div>
        <FindAnEvent />
        <SeeAllGroups />
        <StartGroup />
        <button className='landingPage_options_joinButton'>Join Meetup</button>
        </div>
       </>
    )
}

export default LandingPage;
