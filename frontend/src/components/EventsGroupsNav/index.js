import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './EventsGroupsNav.css';

export default function EventsGroupsNav({ isLoaded }) {



  return (
    <div className='GroupsPage'>
      <div className='GroupsPage_eventGroupLinks'>
        <NavLink className = 'GroupPage_eventGroupLinks_Event' to='/events'>
          Events
        </NavLink>
        <NavLink className = 'GroupPage_eventGroupLinks_Group' to='/groups'>
          Groups
        </NavLink>
      </div>
      <p className='GroupsPage_groupsListHeader'>
        Name needs to change based on the button clicked! Groups in Meetup
      </p>
    </div>
  );
}
