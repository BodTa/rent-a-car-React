import React from "react";
import useGeneral from "../../hooks/useGeneral";

const UserCarCard = (props) => {
  const { toast, ToastContainer } = useGeneral();
  return (
    <div className="car-card">
      <div className="card-img">
        <img src={props.imagePath} />
      </div>
      <div className="card-footer">
        <h3 className="card-title">
          {props.brandName} {props.carName}
        </h3>
        <div className="card-buttons">
          <button>Stop Renting</button>
          <button>Edit</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCarCard;
