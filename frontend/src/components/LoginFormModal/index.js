import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import "../Navigation/Navigation.css"

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [displayCredErr, setDisplayCredErr] = useState(false)
  const [password, setPassword] = useState("");
  const [displayPasErr, setDisplayPasErr] = useState(false)
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { closeModal } = useModal();

  // console.log('test')

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  // console.log('submitted: ', submitted)
  // console.log('displayCredError: ', displayCredErr)

  let err = {}
  // if (submitted) {
    if (credential.length < 4) {
      err.credential = 'Make sure your password is 4+ characters'
    }
    if (password.length < 6) {
      err.password = 'Make sure your password is 6+ characters'
    }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='space'>
          <div className='displayFlex justifySpaceBetween'>

            <label className=''>
              Username or Email
            </label>
            <input
              className=''
              type="text"
              value={credential}
              onChange={(e) => {
                setCredential(e.target.value)
                setDisplayCredErr(true)
              }}
              required
            />
          </div>
          {displayCredErr && <p>{err.credential}</p>}
          <div className='space paddingTop'>
            <div className='displayFlex justifySpaceBetween'>
              <label>
                Password
              </label>
              <input
                className=''
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setDisplayPasErr(true)
                }}
                required
              />
            </div>
          </div>
        </div>
        {displayPasErr && <p>{err.password}</p>}
        <div className='paddingTop displayFlex justifyCenter'>
          <button
            className='width'
            type="submit"
            disabled={Object.values(err).length > 0}
            onClick={() => setSubmitted(true)}
            >
            Log In
          </button>
        </div>
        <div className='paddingTop displayFlex justifyCenter'>
          <button
          className='width'
          onClick={() => {
            setCredential('demo-user@user.io')
            setPassword('password')
          }}
          >
            Log in as Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
