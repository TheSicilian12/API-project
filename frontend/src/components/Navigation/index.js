import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const user = useSelector((state) => state.session.user)

  // console.log('user: ', user)

  return (
      <div className='displayFlex justfiySpaceBetween alignCenter'>
        <div className='home'>
          <NavLink exact to="/" className='adventureUpFont'>Adventureup</NavLink>
        </div>
        <div className='borderBlack displayFlex paddingRight'>
          <div className='displayFlex alignCenter paddingRightStartNewGroup'>
            {user && <NavLink to='/groups/new' className='borderGreen'>
              Start a new group
            </NavLink>}
          </div>
          {isLoaded && (
            <div className='borderPurple displayFlex alignCenter justifyCenter'>
              <ProfileButton user={sessionUser} />
            </div>
          )}
        </div>
      </div>
  );
}

export default Navigation;
