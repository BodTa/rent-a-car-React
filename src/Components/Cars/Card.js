import React from "react";
import "./Cars.css";
const Card = (props) => {
  return (
    <div>
      <div className="car-card">
        <div className="card-header">
          <h3>
            {props.brandName} {props.carName}
          </h3>
        </div>
        <div className="card-img">
          <img src={"http:/localhost:5149" + props.imagePath} />
        </div>
        <div className="card-footer">
          <h3>Daily Price: {props.dailyPrice}$</h3>
          <br />
          <h4>Description: {props.description}</h4>
          <br />
          <h4>Model Year: {props.modelYear}</h4>
        </div>
        <div className="card-buttons">
          <button className="rent-btn">Rent</button>
          <button className="detail-btn">See More</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
