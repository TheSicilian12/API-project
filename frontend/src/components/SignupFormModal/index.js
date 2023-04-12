import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  console.log('errors: ', errors)
  return (
    <>
      <h1>Sign Up</h1>
      <form
        className='displayFlex flex-directionColumn'
        onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='borderGreen displayFlex width justfiySpaceBetween paddingDown'>
          <label className=''>
            Email
          </label>
          <input
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='borderGreen displayFlex width justfiySpaceBetween paddingDown'>
          <label className=''>
            Username
          </label>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='borderGreen displayFlex width justfiySpaceBetween paddingDown'>
          <label className=''>
            First Name
          </label>
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='borderGreen displayFlex width justfiySpaceBetween paddingDown'>
          <label className=''>
            Last Name
          </label>
          <input
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className='borderGreen displayFlex width justfiySpaceBetween paddingDown'>
          <label className=''>
            Password
          </label>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='borderGreen displayFlex width justfiySpaceBetween paddingDown'>
          <label className=''>
            Confirm Password
          </label>
          <input
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
