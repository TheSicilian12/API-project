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
      <div>
        {isLoaded && (
          <div className='displayFlex alignCenter justifyCenter padding paddingRight'>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>

  );
}

export default Navigation;
