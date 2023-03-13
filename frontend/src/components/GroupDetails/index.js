import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GroupDetails.css';

function GroupDetails() {
    return (

        <div className='GroupDetails'>
            <div className='GroupDetails_GroupsButton'>
                <p>{'<'}</p>
                <NavLink to='/groups'>Groups</NavLink>
            </div>
            <div className='GroupDetails_Details'>
                
            </div>
        </div>

    )
}

export default GroupDetails;
