import "./Login.css";
import React from "react";
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useGeneral from "../../hooks/useGeneral";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { auth, setAuth, ToastContainer, toast } = useGeneral();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //To locate the user to where he/she came from.
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ Email: email, Password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userResponse = await axios.get(
        `/Users/getdetailsbyemail?email=${email}`
      );
      const userId = userResponse.data.data.userId;
      const accessToken = response.data.accessToken.token;
      const decodedToken = await jwt_decode(accessToken);
      const roles = [].concat(
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
      setAuth({
        roles: roles,
        email: email,
        password: password,
        accessToken: accessToken,
        userId: userId,
        phoneNumber: userResponse?.data?.data?.phoneNumber,
      });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        notify("No Server Response");
      }
      notify(error.response.data);
    }
  };
  const notify = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  console.log(auth);
  return (
    <section onSubmit={handleSubmit}>
      <ToastContainer />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="on"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <button className="sign-in">Sign In</button>

        <p>
          Need an Account? <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
