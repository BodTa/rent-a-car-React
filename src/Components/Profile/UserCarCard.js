import React from "react";
import { Link } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";

const UserCarCard = (props) => {
  const handleDelete = () => {};
  const handleEdit = () => {};
  const { toast, ToastContainer } = useGeneral();
  return (
    <div className="car-card">
      <div className="card-img">
        <img src={props?.imagePath} />
      </div>
      <div className="card-footer">
        <h3 className="card-title">
          {props?.brandName} {props?.carName}
        </h3>
        {props?.isSeller && (
          <div className="card-buttons">
            <button className="stp-rent-btn">Stop Renting</button>
            <button className="edit-btn">Edit</button>
          </div>
        )}
        {!props?.isSeller && (
          <div className="card-buttons">
            <Link to={`/rent/${props?.carId}`}>
              <button className="rent-btn">Rent!</button>
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCarCard;
