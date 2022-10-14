import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const Rent = () => {
  const axiosPrivate = useAxiosPrivate();
  return (
    <section>
      <h1>Renting Page</h1>
      <p>Renting operations...</p>
    </section>
  );
};

export default Rent;
