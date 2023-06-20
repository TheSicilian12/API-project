import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './EventsGroupsNav.css';

export default function EventsGroupsNav({isLoaded}) {
  // const {navSelect, setNavSelect} = useSelector()

  let groupsSelect;
  let eventsSelect;

  isLoaded === 'groups' ? groupsSelect = 'currentSelection' : groupsSelect = 'notCurrentSelection';
  isLoaded === 'events' ? eventsSelect = 'currentSelection' : eventsSelect = 'notCurrentSelection';

  return (
    <div className='GroupsPage displayFlex justifyCenter marginTop UfontTreb'>
      <div className='GroupsPage_eventGroupLinks mainText fontSizeNav'>
        <NavLink
          className = {`GroupPage_eventGroupLinks_Event eventSpaceRight ${eventsSelect}`}
          to='/events'
          >
          Events
        </NavLink>
        <NavLink
          className = {`GroupPage_eventGroupLinks_Group ${groupsSelect}`}
          to='/groups'
          >
          Groups
        </NavLink>
      </div>
    </div>
  );
}
