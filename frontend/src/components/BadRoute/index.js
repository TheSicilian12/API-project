import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import badRouteImage from '../assets/Images/badRoute.png'
import './BadRoute.css';
import '../UniversalCSS.css';

export default function BadRoute() {

    return (
        <div className='UdisplayFlex Uflexdirection-column justifyCenter alignCenter UfontTreb'>
            <img
                className='marginPhoto'
                // width='100%'
                src={badRouteImage}
                />
        <h1 className='textHeaderFontSize UblackColor'>Nothing good found here!</h1>
        <h2 className='textSubHeaderFontSize UblackColor'>Head back to see more content.</h2>
        </div>

    )
}
