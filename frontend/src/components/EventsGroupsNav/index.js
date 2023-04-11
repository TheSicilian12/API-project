import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './EventsGroupsNav.css';

export default function EventsGroupsNav({isLoaded}) {
  // const {navSelect, setNavSelect} = useSelector()
  console.log('isLoaded: ', isLoaded)

  let groupsSelect;
  let eventsSelect;

  console.log('isLoaded: ', isLoaded)

  isLoaded === 'groups' ? groupsSelect = 'currentSelection' : groupsSelect = 'notCurrentSelection';
  isLoaded === 'events' ? eventsSelect = 'currentSelection' : eventsSelect = 'notCurrentSelection';

  console.log('groupsSelect: ', groupsSelect)
  console.log('eventsSeelct: ', eventsSelect)

  return (
    <div className='GroupsPage borderBlack displayFlex justifyCenter marginTop'>
      <div className='GroupsPage_eventGroupLinks borderGreen mainText fontSizeNav'>
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
