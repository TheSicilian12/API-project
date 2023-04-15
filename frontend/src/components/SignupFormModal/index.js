import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import '../UniversalCSS.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [displayEmailErr, setDsiplayEmailErr] = useState(false);
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
            // console.log(Object.values(data.errors))
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
  if (!email) {
    err.email = 'Please enter an email.'
  }

  let disableButton;
  if (Object.values(err).length > 0) {
    disableButton = 'not-allowedCursor'
  }

  // console.log('errors: ', errors)
  return (

    <div className='UfontTreb displayFlex flex-directionColumn alignCenter'>
      <h1 className=''>Sign Up</h1>
      <form
        className='dimensionsForm textSize'
        onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='displayFlex justfiySpaceBetween paddingDown'>
          <label className=''>
            Email
          </label>
          <input
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setDsiplayEmailErr(true);
            }}
            required
          />
        </div>
        {displayEmailErr && <p className='error'>{err.email}</p>}
        <div className='displayFlex justfiySpaceBetween paddingDown'>
          <label className=''>
            Username
          </label>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setDisplayUsernameErr(true)
            }}
            required
            />
        </div>
          {displayUsernameErr && <p className='error'>{err.username}</p>}
        <div className='displayFlex justfiySpaceBetween paddingDown'>
          <label className=''>
            First Name
          </label>
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
              setDisplayFirstNameErr(true)
            }}
            required
            />
        </div>
        {displayFirstNameErr&& <p className='error'>{err.firstName}</p>}
        <div className='displayFlex justfiySpaceBetween paddingDown'>
          <label className=''>
            Last Name
          </label>
          <input
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
              setDisplayLastNameErr(true)
            }}
            required
            />
        </div>
        {displayLastNameErr && <p className='error'>{err.lastName}</p>}
        <div className='displayFlex justfiySpaceBetween paddingDown'>
          <label className=''>
            Password
          </label>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setDisplayPasswordErr(true)
            }}
            required
          />
        </div>
        {displayPasswordErr && <p className='error'>{err.password}</p>}
        <div className='displayFlex justfiySpaceBetween paddingDown marginBottomLrg'>
          <label className=''>
            Confirm Password
          </label>
          <input
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setDisplayConfirmPasswordErr(true)
            }}
            required
            />
        </div>
        {displayConfirmPasswordErr && <p className='error'>{err.confirmPassword}</p>}
        <div className='displayFlex justifyCenter'>
          <button
            className={`UpinkBorder UpurpleButton UbuttonDimensions ${disableButton}`}
            type="submit"
            disabled={Object.values(err).length > 0}
            >
            Sign Up
          </button>
        </div>
      </form>
  </div>
  );
}

export default SignupFormModal;
