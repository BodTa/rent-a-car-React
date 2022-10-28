import React from "react";
import { Link } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";

const UserCarCard = (props) => {
  const handleDelete = () => {};
  const handleEdit = () => {};
  const { toast, ToastContainer, isDark } = useGeneral();
  return (
    <div className="car-card">
      <div className="card-img">
        <img src={props?.imagePath} />
      </div>
      <div className="card-footer">
        <h4>{props?.dailyPrice} $</h4>
        <h5 className="card-title">
          {props?.brandName} {props?.carName}
        </h5>
        {props?.isSeller && (
          <div className="card-buttons">
            <button className="stp-rent-btn">Stop Renting</button>
            <button className="edit-btn">Edit</button>
          </div>
        )}
        {!props?.isSeller && (
          <div className="card-buttons">
            <button className="see-details-btn">Learn More</button>
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
