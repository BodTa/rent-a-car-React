import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Loading.css";
const Loading = () => {
  return (
    <div className="load-screen">
      <ClipLoader
        color="#00000"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
