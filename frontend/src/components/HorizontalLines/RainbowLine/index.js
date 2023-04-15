import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './RainbowLine.css';
import '../../UniversalCSS.css';
import raincornImage from '../../assets/Images/rainbow-removebg-preview_1.png';
import finnImage from '../../assets/Images/atFinn.png';
import jakeImage from '../../assets/Images/atJake.png';
import bubblegumImage from '../../assets/Images/atBubblegum.png';
import iceKingImage from '../../assets/Images/atIceKing.png';
import mintImage from '../../assets/Images/atMint.png';
import penguinImage from '../../assets/Images/atPenguin.png';

export default function RainbowLine() {

    return (
        <div className='UdisplayFlex UjustifyCenter'>
            <img
                className='dividerPaddingRight'
                width='20%'
                src={finnImage}
            />
              <img
                className='dividerPaddingRight'
                width='20%'
                src={jakeImage}
            />
              <img
                className='dividerPaddingRight'
                width='20%'
                src={bubblegumImage}
            />
             <img
                className='dividerPaddingRight'
                width='20%'
                src={iceKingImage}
            />
             <img
                className='dividerPaddingRight'
                width='20%'
                src={mintImage}
            />
             <img
                className='dividerPaddingRight'
                width='20%'
                src={penguinImage}
            />
             <img
                width='20%'
                src={raincornImage}
            />
        </div>
    )
}
