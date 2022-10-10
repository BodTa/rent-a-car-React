import React from "react";
import "./Unauthorized.css";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const Navigate = useNavigate();
  const goBack = () => Navigate(-1);
  return (
    <section className="un-auth">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={goBack} className="sign-in">
          Go back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
