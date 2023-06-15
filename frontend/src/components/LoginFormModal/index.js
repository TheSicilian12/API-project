import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import "../Navigation/Navigation.css"
import "../UniversalCSS.css";
import unacceptable from "../assets/Images/sticker_2130.png"
import goodSnail from "../assets/Images/snailGood.webp"
import badSnail from "../assets/Images/snailBad.png"

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [credential, setCredential] = useState("");
  const [displayCredErr, setDisplayCredErr] = useState(false)
  const [password, setPassword] = useState("");
  const [displayPasErr, setDisplayPasErr] = useState(false)
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(history.push("/"))
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  let err = {}
  if (credential.length < 4) {
    err.credential = 'Make sure your password is 4+ characters'
  }
  if (password.length < 6) {
    err.password = 'Make sure your password is 6+ characters'
  }

  let notAllowed;
  if (Object.values(err).length > 0) {
    notAllowed = 'not-allowedCursor'
  }

  return (
    <div className='displayFlex flex-directionColumn alignCenter UfontTreb'>
      {/* <div> */}
      <h1>Log In</h1>
      <form
        className='logIndimensionsForm textSize displayFlex flex-directionColumn justifyCenter alignCenter'
        onSubmit={handleSubmit}>
        <div className='displayFlex alignCenter'>
          <div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div>
              <div className='space'>
                <div className='displayFlex justifySpaceBetween'>
                  <label >
                    Username or Email
                  </label>
                  <input

                    type="text"
                    value={credential}
                    onChange={(e) => {
                      setCredential(e.target.value)
                      setDisplayCredErr(true)
                    }}
                    required
                  />
                </div>
                {displayCredErr && <p className='errors'>{err.credential}</p>}
              </div>
              <div className='space paddingTop'>
                <div className='displayFlex justifySpaceBetween'>
                  <label>
                    Password
                  </label>
                  <input
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
            {displayPasErr && <p className='errors'>{err.password}</p>}
          </div>

          {/* no errors */}
          {/* {(!displayPasErr && !displayCredErr) && <div> */}
            <img
              className={`snailDimensions ${Object.values(err).length === 0 ? 'displayOn' : 'displayOff'}`}
              src={goodSnail}
            />
          {/* </div>} */}

          {/* errors */}
          {(displayPasErr || displayCredErr) ? <div>
            <img
              className={`snailDimensions ${Object.values(err).length > 0 ? 'displayOn' : 'displayOff'}`}
              src={badSnail}
            />
          </div> :
          <img
              className={`snailDimensions`}
              src={goodSnail}
            />
          }

        </div>
        <div className='paddingTop displayFlex justifyCenter'>
          <button
            className={`smallWidth UpurpleButton UpinkBorder UbuttonSmallDimensions ${notAllowed}`}
            type="submit"
            disabled={Object.values(err).length > 0}
            onClick={() => setSubmitted(true)}
          >
            Log In
          </button>
        </div>
        <div className='paddingTop displayFlex justifyCenter'>
          <button
            className='width UpurpleButton UpinkBorder UbuttonDimensions'
            onClick={() => {
              setCredential('demo-user@user.io')
              setPassword('password')
            }}
          >
            Log in as Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
