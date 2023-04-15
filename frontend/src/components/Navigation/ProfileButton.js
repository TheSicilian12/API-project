import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import '../UniversalCSS.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    // console.log('showMenu: ', showMenu)

    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='UfontTreb'>
      <button onClick={openMenu} className='displayFlex alignCenter justifyCenter squareFavicon marginSquareRight'>
        <i class="fa-solid fa-dragon fa-2xl"></i>
        {/* <i class="fa-solid fa-hat-wizard fa-2xl"></i> */}
        {/* <i class="fa-solid fa-dungeon fa-2xl"></i> */}
      </button>


      <ul className={`${ulClassName} positionAbsolute positionNavBar paddingProfileDropDown`} ref={ulRef}>

        {user ? (
          <div className='displayFlex flex-directionColumn justifyCenter alignCenter loggedInTextSize positionMarginLoggedIn'>
            <div className='userMarginBottom'>{`Hello, ${user.firstName}`}</div>
            <div className='userMarginBottom'>{user.email}</div>
            <div className='userMarginBottom'>{user.username}</div>
            {/* <ul>{user.firstName} {user.lastName}</ul> */}

            <button
              className='userMarginBottom UgrayButton UblackBorderWeighted border-Radius15 UbuttonProfileDimensions'
              onClick={logout}>
                Log Out
            </button>
            <Link
              className='userMarginBottom'
              onClick={() => setShowMenu(false)}
              to='/groups'>
                View Groups
            </Link>
            <Link
              className='userMarginBottom'
              onClick={() => setShowMenu(false)}
              to='/events'>
                View Events
            </Link>
          </div>
        ) : (
          <div className='displayFlex flex-directionColumn alignCenter positionMarginLogInSignUp'>
            {/* <ul className='borderRed displayFlex justifyCenter alignCenter'> */}
            <div className='logInMarginBottom'>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </div>
            {/* </ul> */}
          </div>
        )}
      </ul>
    </div>
  );
}


export default ProfileButton;
