import React from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

import { Link } from "react-router-dom";
const Main = () => {
  return (
    <section>
      <h1>Main Page</h1>
      <Link to={"/cars"}>
        <button>To Cars</button>
      </Link>
      <br />
    </section>
  );
};

export default Main;
