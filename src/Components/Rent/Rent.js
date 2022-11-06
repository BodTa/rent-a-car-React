import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGeneral from "../../hooks/useGeneral";
import "./Rent.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
const Rent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { cars, ToastContainer, toast, auth, axiosPrivate } = useGeneral();
  const car = cars.find(({ carId }) => carId == id);
  const [x, setX] = useState(0);
  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

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
  // Notifier
  const notify = (type, message) => {
    if (type === "error") {
      toast.error(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (type === "success") {
      toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Posting data to Backend -- Adding Opt.
  const handleRent = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/Rentals/add",
        JSON.stringify({
          carId: id,
          customerId: auth?.userId,
          rentDate: rentDate,
          returnDate: returnDate,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      notify("success", "Car has rented! Have a nice ride");
    } catch (error) {
      notify("error", error.response.data.message);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return (
    <div className="rent-container">
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
      <form onSubmit={handleRent} className="rent-form">
        <label htmlFor="rentDate"> Rent Date</label>
        <input
          type="date"
          autoComplete="off"
          onChange={(e) => {
            setRentDate(e.target.value);
          }}
          required
        />
        <label htmlFor="rentDate"> Return Date</label>
        <input
          type="date"
          autoComplete="off"
          onChange={(e) => {
            setReturnDate(e.target.value);
          }}
          required
        />
        {<button className="form-rent">Rent the Car!</button>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Rent;
