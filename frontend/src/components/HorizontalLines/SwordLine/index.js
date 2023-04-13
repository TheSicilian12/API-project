import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SwordLine.css';
import groupDividerImage from '../../assets/Images/Daco_4730261.png';

export default function SwordLine() {

    return (
        <div>
            <img
                src={groupDividerImage}
            />
        </div>
    )
}
