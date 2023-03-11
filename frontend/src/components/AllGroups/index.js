import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AllGroups.css';

function AllGroups({ isLoaded }) {

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
        Groups in Meetup
      </p>
    </div>
  );
}

export default AllGroups;
