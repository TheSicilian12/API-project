import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='displayFlex justfiySpaceBetween borderBlack alignCenter '>
      <div className='home borderBlack'>
        <NavLink exact to="/" className='adventureUpFont'>Adventureup</NavLink>
      </div>
      <div className='profile '>
        {isLoaded && (
          <div className='displayFlex borderRed alignCenter justifyCenter padding '>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>

  );
}

export default Navigation;
