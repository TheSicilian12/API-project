import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import '../UniversalCSS.css';

import goodSnail from "../assets/Images/snailGood.webp"
import badSnail from "../assets/Images/snailBad.png"

import goodFinn from "../assets/Images/finnSignUpGood.png"
import badFinn from "../assets/Images/finnSignUpBad.png"

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [displayEmailErr, setDisplayEmailErr] = useState(false);
  const [username, setUsername] = useState("");
  const [displayUsernameErr, setDisplayUsernameErr] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [displayFirstNameErr, setDisplayFirstNameErr] = useState(false);
  const [lastName, setLastName] = useState("");
  const [displayLastNameErr, setDisplayLastNameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [displayPasswordErr, setDisplayPasswordErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayConfirmPasswordErr, setDisplayConfirmPasswordErr] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)

        //errors here could crash the app
        .catch(async (res) => {
          const data = await res.json();
          //change data.errors to an array because of the object issue in setErrors
          if (data && data.errors) {
            // setErrors(data.errors);
            setErrors([...Object.values(data.errors)])
          }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  let err = {}
  if (username.length < 4) {
    err.username = '4+ characters for a username.'
  }
  if (password.length < 6) {
    err.password = '6+ characters for a password.'
  }
  if (confirmPassword !== password) {
    err.confirmPassword = 'Your confirmation does not match your password.'
  }
  if (!firstName) {
    err.firstName = 'Please enter your first name.'
  }
  if (!lastName) {
    err.lastName = 'Please enter your last name.'
  }
  const regEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (!regEx.test(email)) err.email = 'Please enter a valid email.'
  let disableButton;
  if (Object.values(err).length > 0) {
    disableButton = 'not-allowedCursor disabledButton'
  }

  return (
    <div className='signup-dimensions displayFlex flex-directionColumn alignCenter UfontTreb signup-textSize'>
      <h1 className=''>Sign Up</h1>
      <form
        // className='dimensionsForm textSize'
        className='signup-form textSize displayFlex flex-directionColumn'
        onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        <div className="displayFlex">
          <div>
            <div className='signup-inputs'>
              <div className="displayFlex">
                {(!displayEmailErr || !err.email) && <p>Email</p>}
                {!displayEmailErr && <p className="errors">*</p>}
              </div>
              {displayEmailErr &&
                err.email &&
                <p className='errors'>Email* {err.email}</p>}

              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setDisplayEmailErr(true)
                }}
                required
              />
            </div>

            <div className='signup-inputs'>
              <div className="displayFlex">
                {(!displayUsernameErr || !err.username) && <p>Username</p>}
                {!displayUsernameErr && <p className="errors">*</p>}
              </div>
              {displayUsernameErr &&
                err.username &&
                <p className='errors'>Username* {err.username}</p>}

              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setDisplayUsernameErr(true)
                }}
                required
              />
            </div>

            <div className='signup-inputs'>
              <div className="displayFlex">
                {(!displayFirstNameErr || !err.firstName) && <p>First Name</p>}
                {!displayFirstNameErr && <p className="errors">*</p>}
              </div>
              {displayFirstNameErr &&
                err.firstName &&
                <p className='errors'>First Name* {err.firstName}</p>}

              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  setDisplayFirstNameErr(true)
                }}
                required
              />
            </div>

            <div className='signup-inputs'>
              <div className="displayFlex">
                {(!displayLastNameErr || !err.lastName) && <p>Last Name</p>}
                {!displayLastNameErr && <p className="errors">*</p>}
              </div>
              {displayLastNameErr &&
                err.lastName &&
                <p className='errors'>Last Name* {err.lastName}</p>}

              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  setDisplayLastNameErr(true)
                }}
                required
              />
            </div>

            <div className='signup-inputs'>
              <div className="displayFlex">
                {(!displayPasswordErr || !err.password) && <p>Password</p>}
                {!displayPasswordErr && <p className="errors">*</p>}
              </div>
              {displayPasswordErr &&
                err.password &&
                <p className='errors'>Password* {err.password}</p>}

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setDisplayPasswordErr(true)
                }}
                required
              />
            </div>

            <div className='signup-inputs'>
              <div className="displayFlex">
                {(!displayConfirmPasswordErr || !err.confirmPassword) && <p>Confirm Password</p>}
                {!displayConfirmPasswordErr && <p className="errors">*</p>}
              </div>
              {displayConfirmPasswordErr &&
                err.confirmPassword &&
                <p className='errors'>Confirm Password* {err.confirmPassword}</p>}

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setDisplayConfirmPasswordErr(true)
                }}
                required
              />
            </div>
          </div>
          <div className="signup-image-button-container">
            {/* <img
              className={`finn-good-dimensions ${Object.values(err).length === 0 ? 'displayOn' : 'displayOff'}`}
              src={goodFinn}
            /> */}
            {(displayEmailErr ||
              displayUsernameErr ||
              displayFirstNameErr ||
              displayLastNameErr ||
              displayPasswordErr ||
              displayConfirmPasswordErr) ? <div>
              <img
                className={`finn-bad-dimensions ${Object.values(err).length > 0 ? 'displayOn' : 'displayOff'}`}
                src={badFinn}
              />
              <img
                className={`finn-good-dimensions ${Object.values(err).length > 0 ? 'displayOff' : 'displayOn'}`}
                src={goodFinn}
              />
            </div> :
              <img
                className={`finn-good-dimensions`}
                src={goodFinn}
              />
            }
            <div className='signup-signupButton-waring'>
              <button
                className={`UpinkBorder UpurpleButton UbuttonDimensions ${disableButton}`}
                type="submit"
                disabled={Object.values(err).length > 0}
              >
                Sign Up
              </button>
              {Object.values(err).length > 0 && <div className="errors">
                *Add your information
              </div>}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default SignupFormModal;
