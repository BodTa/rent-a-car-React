import "./Login.css"
import React from 'react'
import { useRef,useState,useEffect,useContext } from "react"
import AuthContext from "../../Context/AuthProvider"
import axios from "../../api/axios"
const LOGIN_URL = '/auth/login';
const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const emailRef = useRef();
  const errRef= useRef();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errMsg,setErrMsg] = useState('');
  const [success,setSuccess] = useState(false);

  useEffect(()=>{
    emailRef.current.focus();
  },[])

  useEffect(()=>{
    setErrMsg('');
  },[email,password])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({Email:email,Password:password}),
        {
          headers: {'Content-Type':'application/json'},
          withCredentials: true
        }
      );
    console.log(JSON.stringify(response?.data))
    //get token and roles.
    setEmail('');
    setPassword('');
    setSuccess(true);
    } catch (error) {
      if(!error?.response){
        setErrMsg("No Server Response")
      }else{
        setErrMsg(error.response.Message);
      }
      errRef.current.focus();
    }
    

  }
  return (
    <section onSubmit={handleSubmit}>
      <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input 
        type="text" 
        id="email"
        ref={emailRef}
        autoComplete="off"
        onChange={(e)=>{setEmail(e.target.value)}}
        value={email}
        required
        />
        <label htmlFor="password">Password:</label>
        <input 
        type="password" 
        id="password"
        onChange={(e)=>{setPassword(e.target.value)}}
        value={password}
        required
        />
        <button className="">Sign In</button>
        <p>Need an Account? <br/>
          <span className="line">
            {/*Put router link here */}
            <a href="#">Sign Up </a>
          </span>
        </p>
      </form>
    </section>
  )
}

export default Login;