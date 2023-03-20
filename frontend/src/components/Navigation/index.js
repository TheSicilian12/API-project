import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='displayFlex justfiySpaceBetween borderBlack alignCenter'>
      <div className='home borderBlack'>
        <NavLink exact to="/">Adventureup</NavLink>
      </div>
      <div className='profile'>
        {isLoaded && (
          <ul className='displayFlex borderBlack alignCenter justifyCenter'>
            <ProfileButton user={sessionUser} />
          </ul>
        )}
      </div>
    </div>

  );
}

export default Navigation;
