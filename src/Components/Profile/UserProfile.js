import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
const UserProfile = ({
  telNumber,
  lastName,
  firstName,
  email,
  imagePath,
  Rates,
  sellerId,
  userId,
  setIsRated,
  notify,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  console.log(Rates);
  const handleRate = (e) => {
    try {
      var result = axiosPrivate.post(
        "/UserRate/add",
        {
          userId: sellerId,
          raterId: userId,
          rate: e * 2,
        },
        {
          withCredentials: true,
        }
      );
      notify("User has been rated!");
      setIsRated((prev) => {
        return !prev;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [avgRate, setAvgRate] = useState(0);
  useEffect(() => {
    setAvgRate(
      Rates?.reduce((total, item) => {
        return total + item.rate;
      }, 0) /
        (Rates?.length * 2)
    );
    return () => {
      setAvgRate(0);
    };
  }, [Rates]);
  return (
    <div className="user-info-container">
      <div className="user-info-img">
        <img className="user-profile-img" src={imagePath} />
      </div>
      <div className="user-info-rate">
        <ReactStars
          count={5}
          value={avgRate}
          size={30}
          color2={"#ffd700"}
          onChange={handleRate}
        />
        <label>({Rates?.length ? Rates.length : 0})</label>
      </div>
      <div className="user-info">
        <div className="user-info-icons">
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faPhone} />
        </div>
        <div className="user-infos">
          <p>
            {firstName} {lastName}
          </p>
          <p>{email}</p>
          <p>{telNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
