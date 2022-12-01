import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserCarCard = (props) => {
  const navigate = useNavigate();
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
            <button
              className="stp-rent-btn"
              onClick={() => props.handleDelete(props.carId)}
            >
              Stop Renting
            </button>
            <button
              className="edit-btn"
              onClick={() => navigate(`/car-edit/${props?.carId}`)}
            >
              Edit
            </button>
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
    </div>
  );
};

export default UserCarCard;
