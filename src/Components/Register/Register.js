import "./Register.css";
import { React, useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const TELNUMBER_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const REGISTER_URL = "/Auth/register";
const Register = () => {
  const firstNameRef = useRef();
  const errRef = useRef();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [telNumber, setTelNumber] = useState("");
  const [validTelNumber, SetValidTelNumber] = useState(false);
  const [telNumberFocus, setTelNumberFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFistName, setvalidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setvalidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);
  //For Email
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setvalidEmail(result);
  }, [email]);

  //For Password
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  // For First Name
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setvalidFirstName(result);
  }, [firstName]);

  //For Last Name
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setvalidLastName(result);
  }, [lastName]);
  // For Phone Number
  useEffect(() => {
    const result = TELNUMBER_REGEX.test(telNumber);
    SetValidTelNumber(result);
  }, [telNumber]);
  // For Err Message
  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkPassword = PASSWORD_REGEX.test(password);
    const checkEmail = EMAIL_REGEX.test(email);
    if (!checkEmail || !checkPassword) {
      setErrMsg("Invalid Entry.");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          TelNumber: telNumber,
          Password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response.data.data.token;
      const decodedToken = jwt_decode(accessToken);
      const roles =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const userId =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      setAuth({
        roles: roles,
        email: email,
        password: password,
        accessToken: accessToken,
        userId: userId,
      });
      setSuccess(true);
      navigate("/");
    } catch (error) {
      if (!error.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(error.response.Message);
      }

      errRef.current.focus();
    }
  };
  const handleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setTelNumber(formattedPhoneNumber);
  };
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <section className="register-body">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/*First and Last Name input Section */}

        <label htmlFor="firstName">
          First Name:
          <span className={validFistName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validFistName || !firstName ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="firstName"
          ref={firstNameRef}
          autoComplete="off"
          onChange={(e) => setFirstName(e.target.value)}
          required
          aria-invalid={validFistName ? "false" : "true"}
          aria-describedby="uidfirst"
          onFocus={() => setFirstNameFocus(true)}
          onBlur={() => setFirstNameFocus(false)}
        />
        <p
          id="uidfirst"
          className={
            firstNameFocus && firstName && !validFistName
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid first name.
        </p>

        <label htmlFor="lastName">
          Last Name:
          <span className={validLastName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validLastName || !lastName ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="lastName"
          autoComplete="off"
          onChange={(e) => setLastName(e.target.value)}
          required
          aria-invalid={validLastName ? "false" : "true"}
          aria-describedby="uidlast"
          onFocus={() => setLastNameFocus(true)}
          onBlur={() => setLastNameFocus(false)}
        />
        <p
          id="uidlast"
          className={
            lastNameFocus && lastName && !validLastName
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid last name.
          <br />
        </p>

        {/*E mail input section */}
        <label htmlFor="email">
          Email:
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="uidnote"
          className={
            emailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid email.
          <br />
          Example: example@gmail.com
        </p>
        {/* Phone input section*/}
        <label htmlFor="phoneNumber">
          Phone Number:
          <span className={validTelNumber ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validTelNumber || !telNumber ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          autoComplete="off"
          placeholder="(535) 555-5555"
          onChange={(e) => handleInput(e)}
          value={telNumber}
          required
          aria-invalid={validTelNumber ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setTelNumberFocus(true)}
          onBlur={() => setTelNumberFocus(false)}
        />
        <p
          id="uidnote"
          className={
            telNumberFocus && telNumber && !validTelNumber
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter a valid phone number.
          <br />
        </p>
        {/*Password input section */}
        <label htmlFor="password">
          Password:
          <span className={validPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="passwordnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id="passwordnote"
          className={
            passwordFocus && password && !validPassword
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters <br />
          Must include uppercase and lowercase letters, a number and a special
          character. <br />
          Allowed special characters: ! @ $ # %
        </p>

        {/* match password input section*/}
        <label htmlFor="matchPassword">
          Confirm Password:
          <span className={validMatch && matchPassword ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="matchPassword"
          onChange={(e) => setMatchPassword(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="matchnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="matchnote"
          className={
            matchFocus && matchPassword && !validMatch
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match with the previous password.
        </p>
        <button
          className="sign-up"
          disabled={!validEmail || !validPassword || !validMatch ? true : false}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already Registered?
        <br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
