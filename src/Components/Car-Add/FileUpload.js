import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./CarAdd.css";
const FileUpload = ({ uploadHandler, setImgFiles, imgFiles }) => {
  const upload = async (e) => {
    if (e?.target?.files[0]) setImgFiles([...imgFiles, e.target.files[0]]);
  };
  return (
    <>
      <div className="file-card">
        <h4>Upload Image</h4>
        <div className="file-inputs">
          <input type="file" onChange={upload} accept="image/*" />
          <button className="file-button">
            <i>
              <FontAwesomeIcon icon={faPlusCircle} />
            </i>
            Upload
          </button>
        </div>
        <p>Supported Files</p>
        <p>JPG & PNG</p>
      </div>
    </>
  );
};

export default FileUpload;
