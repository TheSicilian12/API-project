import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
      <div className='displayFlex justfiySpaceBetween alignCenter'>
        <div className='home'>
          <NavLink exact to="/" className='adventureUpFont'>Adventureup</NavLink>
        </div>
        <div className='borderBlack displayFlex'>
          <div>
            <h2 className='borderGreen'>Start a new group</h2>
          </div>
          {isLoaded && (
            <div className='borderGreen displayFlex alignCenter justifyCenter paddingProfileIconTR'>
              <ProfileButton user={sessionUser} />
            </div>
          )}
        </div>
      </div>
  );
}

export default Navigation;
