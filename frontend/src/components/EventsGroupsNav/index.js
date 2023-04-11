import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './EventsGroupsNav.css';

export default function EventsGroupsNav({ isLoaded }) {



  return (
    <div className='GroupsPage borderBlack displayFlex justifyCenter marginTop'>
      <div className='GroupsPage_eventGroupLinks borderGreen mainText'>
        <NavLink className = 'GroupPage_eventGroupLinks_Event' to='/events'>
          Events
        </NavLink>
        <NavLink className = 'GroupPage_eventGroupLinks_Group' to='/groups'>
          Groups
        </NavLink>
      </div>
    </div>
  );
}
