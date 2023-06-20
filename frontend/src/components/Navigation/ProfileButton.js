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

    history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='UfontTreb'>
      <button onClick={openMenu} className='displayFlex alignCenter justifyCenter squareFavicon marginSquareRight'>
        <i className="fa-solid fa-dragon fa-2xl"></i>
      </button>


      <ul className={`${ulClassName} positionAbsolute positionNavBar paddingProfileDropDown`} ref={ulRef}>

        {user ? (
          <div className='displayFlex flex-directionColumn justifyCenter alignCenter loggedInTextSize positionMarginLoggedIn profile-info'>
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
              className='userMarginBottom UnoDecoration UnoDecoration UcolorBlack linkGold'
              onClick={() => setShowMenu(false)}
              to='/groups'>
                View Groups
            </Link>
            <Link
              className='userMarginBottom UnoDecoration UcolorBlack linkGold'
              onClick={() => setShowMenu(false)}
              to='/events'>
                View Events
            </Link>
            <Link
              className='userMarginBottom UnoDecoration UcolorBlack linkGold'
              onClick={() => setShowMenu(false)}
              to='/groups/yours'>
                Your Groups
            </Link>
          </div>
        ) : (
          <div className='displayFlex flex-directionColumn alignCenter positionMarginLogInSignUp login-signup-info'>
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
