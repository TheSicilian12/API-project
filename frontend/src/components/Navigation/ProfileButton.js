import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className='squareFavicon positionAbsolute'>
        {/* <i className="fas fa-user-circle fa-2xl" /> */}
        <i class="fa-solid fa-dragon fa-2xl"></i>
        {/* <i class="fa-solid fa-hat-wizard fa-2xl"></i> */}
        {/* <i class="fa-solid fa-dungeon fa-2xl"></i> */}
        </button>
      <ul className={`${ulClassName} positionAbsolute positionNavBar paddingProfileDropDown`} ref={ulRef}>
        {user ? (
          <div className='displayFlex alignCenter squareLogSign flex-directionColumn alignCenter width'>
            <ul>{user.username}</ul>
            <ul>{`Hello ${user.firstName}`}</ul>
            {/* <ul>{user.firstName} {user.lastName}</ul> */}
            <ul>{user.email}</ul>
            <ul>
              <button onClick={logout}>Log Out</button>
            </ul>
          </div>
        ) : (
          <div className='displayFlex positionStickyalignCenter squareLogSign flex-directionRow alignCenter width'>
            <ul className='displayFlex marginBottom'>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </ul>
            <ul>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </ul>
          </div>
        )}
      </ul>
    </>
  );
}


export default ProfileButton;
