import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGeneral from "../../../hooks/useGeneral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faGasPump,
  faRoad,
  faHorseHead,
  faGear,
  faCar,
  faDoorClosed,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import "./CarInfo.css";
const CarInfo = () => {
  const { id } = useParams();
  const { cars } = useGeneral();
  const [x, setX] = useState(0);
  const navigate = useNavigate();
  const car = cars.find(({ carId }) => carId == id);

  const carImages = car?.images;
  const goLeft = () => {
    x === 0 ? setX(-100 * (carImages?.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    x === -100 * (carImages?.length - 1) ? setX(0) : setX(x - 100);
  };
  const goToImage = (index) => {
    setX(0);
    setX(-100 * index);
  };
  return (
    <div className="carInfo-container">
      <div className="car-sliders">
        <div className="car-slider">
          {carImages?.map((image, index) => {
            return (
              <div
                key={index}
                className="car-slide"
                style={{ transform: `translateX(${x}%)` }}
              >
                <img src={"http://localhost:5149" + image.imagePath} />
              </div>
            );
          })}

          {carImages?.length > 1 && (
            <div>
              <button id="goLeft" onClick={goLeft}>
                <FontAwesomeIcon className="icons" icon={faChevronLeft} />
              </button>
              <button id="goRight" onClick={goRight}>
                <FontAwesomeIcon className="icons" icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
        <div className="img-container">
          <div className="small-card-container">
            {carImages?.map((image, index) => {
              return (
                <div
                  onClick={() => goToImage(index)}
                  key={index}
                  className="small-img-card"
                >
                  <img src={"http://localhost:5149" + image.imagePath} />
                </div>
              );
            })}
          </div>
          <div className="img-container-slider"></div>
        </div>
      </div>

      <div className="car-details">
        <div className="details-header">
          <h3>
            {car?.brandName} - {car?.carName}
          </h3>
        </div>
        <div className="details">
          <div className="detail-icons">
            <div className="detail-icon">
              <FontAwesomeIcon className="fa-icon" icon={faGasPump} />
              <FontAwesomeIcon className="fa-icon" icon={faRoad} />
              <FontAwesomeIcon className="fa-icon" icon={faHorseHead} />
              <FontAwesomeIcon className="fa-icon" icon={faCar} />
              <FontAwesomeIcon className="fa-icon" icon={faGear} />
              <FontAwesomeIcon className="fa-icon" icon={faDoorClosed} />
              <FontAwesomeIcon className="fa-icon" icon={faDollar} />
            </div>
            <div className="detail-icon-def">
              <span>Fuel Type</span>
              <hr />
              <span>Total Kilometer</span>
              <hr />
              <span>Horse Power</span>
              <hr />
              <span>Engine Capacity</span>
              <hr />
              <span>Gear Type</span>
              <hr />
              <span>Door Count</span>
              <hr />
              <span>Daily Price</span>
              <hr />
            </div>
          </div>
          <div className="detail-infos">
            <span>{car?.fuelType}</span>
            <hr />
            <span>{car?.kilometer} KM</span>
            <hr />
            <span>{car?.horsePower} HP</span>
            <hr />
            <span>{car?.engineCapacity} CC</span>
            <hr />
            <span>{car?.gearType}</span>
            <hr />
            <span>{car?.doorCount}</span>
            <hr />
            <span>{car?.dailyPrice} $</span>
            <hr />
          </div>
        </div>
        <div className="details-footer">
          <button className="seller-btn">See the Seller</button>
          <button
            onClick={() => {
              navigate(`/rent/${id}`);
            }}
            className="rent-btn"
          >
            Rent!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
