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
    err.credential = '4+ characters'
  }
  if (password.length < 6) {
    err.password = '6+ characters'
  }

  let notAllowed;
  if (Object.values(err).length > 0) {
    notAllowed = 'not-allowedCursor disabledButton'
  }

  return (
    <div className='login-dimensions displayFlex flex-directionColumn alignCenter UfontTreb'>
      {/* <div> */}
      <h1>Log In</h1>
      <form
        className='logIndimensionsForm textSize displayFlex flex-directionColumn justifyCenter alignCenter'
        onSubmit={handleSubmit}>
        <div className='displayFlex alignCenter'>
          <div>
            <ul>
              {errors.map((error, idx) => (
                <ul className="errors" key={idx}>{error}</ul>
              ))}
            </ul>

            <div className="login-inputs-img">

              <div className="displayFlex">
                <div className='space'>
                  <div className='login-inputs justifySpaceBetween'>
                    {(!displayCredErr || !err.credential) && <p>Username or Email</p>}
                    {displayCredErr &&
                      err.credential &&
                      <p className='errors'>Username or Email* {err.credential}</p>}

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


                  <div className='space paddingTop'>
                    <div className='login-inputs justifySpaceBetween'>
                      {(!displayPasErr || !err.password) && <p>Password</p>}
                      {displayPasErr &&
                        err.password &&
                        <p className='errors'>Password* {err.password}</p>}
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
              </div>

              {(displayPasErr || displayCredErr) ? <div>
                <img
                  className={`snailDimensions ${Object.values(err).length > 0 ? 'displayOn' : 'displayOff'}`}
                  src={badSnail}
                />
                <img
                  className={`snailDimensions ${Object.values(err).length > 0 ? 'displayOff' : 'displayOn'}`}
                  src={goodSnail}
                />
              </div> :
                <img
                  className={`snailDimensions`}
                  src={goodSnail}
                />
              }
            </div>
          </div>
        </div>
        <div className='login-loginButton-warning'>





              <button
              className={`smallWidth UpurpleButton UpinkBorder UbuttonSmallDimensions ${notAllowed}`}
              type="submit"
              disabled={Object.values(err).length > 0}
              onClick={() => setSubmitted(true)}
              >
            Log In
          </button>
          {Object.values(err).length > 0 && <div className="errors">
            *Add your log in information
            </div>}

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
