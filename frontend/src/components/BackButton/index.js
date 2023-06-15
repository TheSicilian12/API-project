import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './BackButton.css';
import '../UniversalCSS.css'
import adventureUpLogo from '../assets/Images/AdvenutreUpLogo/adventureupplaceit-transparentedit.png'

import pinkArrowLeft from '../assets/Images/pinkArrowLeft-removebg-preview.png';

function BackButton({text, link}) {
  const history = useHistory()


  return (
    <div>
      <img
        className='pointerCursor displayFlex back-pointer'
        onClick={() => history.push(`${link}`)}
        src={pinkArrowLeft}
      />
      <p
        className="backbutton pointerCursor"
        onClick={() => history.push(`${link}`)}>
          {text}</p>

      {/* <NavLink to='/events' className='displayFlex UblackColor UnoDecoration backButtonTextSize'>Back to All Events</NavLink> */}
    </div>
  );
}

export default BackButton;
