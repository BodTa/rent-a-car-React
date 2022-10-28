import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const UserProfile = ({ telNumber, lastName, firstName, email, imagePath }) => {
  return (
    <div className="user-info-container">
      <div className="user-info-img">
        <img className="user-profile-img" src={imagePath} />
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
