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

  return (
    <div className='displayFlex justfiySpaceBetween alignCenter UfontTreb'>
      <div className='pointerCursor'>
        {/* <NavLink exact to="/" className='adventureUpFont'>Adventureup</NavLink> */}
        <img
          width='400px'
          onClick={() => { history.push('/') }}
          src={adventureUpLogo}
        />

        <div className='links'>
          <a href="https://github.com/TheSicilian12" rel="noopener noreferrer" target="_blank"><i class="aboutLink fab fa-github fa-2x"></i></a>
          <a href="https://www.linkedin.com/in/guidera-michael/" rel="noopener noreferrer" target="_blank"><i class="aboutLink fab fa-linkedin fa-2x"></i></a>
        </div>

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
