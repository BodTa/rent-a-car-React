import React from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

import { Link } from "react-router-dom";
const Main = () => {
  const refresh = useRefreshToken();
  return (
    <section>
      <h1>Main Page</h1>
      <Link to={"/rent"}>
        <button>Rent a car.</button>
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
    </section>
  );
};

export default Main;
