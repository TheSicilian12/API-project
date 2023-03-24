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
            <div className='landingPage_intro borderRed displayFlex justifyCenter'>
                <div>
                    <h1>
                        The people platform - Where skills become monster slaying, problem solving adventuring parties:
                    </h1>
                    <p>
                    Whatever your skills, from heavy damage deeling and herbal remedies to political intrigue and assasinations,
                    there are thousands of people who could use your expertise on Adventureup.
                    Quests are happening every day—log in to join the adventure!
                    </p>
                </div>
                <div>
                    <img class='fit-picture' src='../../../public/assets/epic-adventurous-extreme-sport-composite-260nw-1742451050.webp' alt='Finn and Jake running with loot' width='500' height='600'>
                    </img>
                </div>
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
