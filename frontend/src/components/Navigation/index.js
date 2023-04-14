import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import '../UniversalCSS.css'
import adventureUpLogo from '../assets/Images/AdvenutreUpLogo/adventureupplaceit-transparentedit.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  const user = useSelector((state) => state.session.user);

  // console.log('user: ', user)

  return (
      <div className='displayFlex justfiySpaceBetween alignCenter'>
        <div className='pointerCursor'>
          {/* <NavLink exact to="/" className='adventureUpFont'>Adventureup</NavLink> */}
          <img
            className=''
            width='50%'
            onClick={() => {history.push('/')}}
            src={adventureUpLogo}
          />
        </div>
        <div className='displayFlex paddingRight'>
          <div className='displayFlex alignCenter paddingRightStartNewGroup'>
            {user && <NavLink to='/groups/new' className='UfontTreb UnoDecoration navStartGroup'>
              Start a new group
            </NavLink>}
          </div>
          {isLoaded && (
            <div className='displayFlex alignCenter justifyCenter'>
              <ProfileButton user={sessionUser} />
            </div>
          )}
        </div>
      </div>
  );
}

export default Navigation;
