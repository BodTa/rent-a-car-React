import React from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

import { Link } from "react-router-dom";
const Main = () => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const show = async () => {
    console.log(auth);
  };
  return (
    <section>
      <h1>Main Page</h1>
      <Link to={"/rent"}>
        <button>Rent a car.</button>
      </Link>
      <Link to={"/cars"}>
        <button>To Cars</button>
      </Link>
      <br />
      <button
        onClick={() => {
          refresh();
        }}
      >
        Refresh
      </button>
      <br />
      <button onClick={show}>Show auth</button>
    </section>
  );
};

export default Main;
