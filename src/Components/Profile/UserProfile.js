import React from "react";

const UserProfile = ({ lastName, firstName, email }) => {
  return (
    <div className="user-info-container">
      <div className="user-info-img"></div>
      <div className="user-info">
        <label>{lastName}</label>
        <label>{firstName}</label>
        <label>{email}</label>
      </div>
    </div>
  );
};

export default UserProfile;
