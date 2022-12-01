import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./CarAdd.css";
const FileList = ({ imgFiles, setImgFiles }) => {
  const removeImage = (imageName) => {
    setImgFiles(imgFiles.filter((imgFile) => imgFile.name !== imageName));
  };
  return (
    <ul className="file-list">
      {imgFiles &&
        imgFiles.map((i) => (
          <li key={i?.name}>
            {i.name}
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => removeImage(i.name)}
            />
          </li>
        ))}
    </ul>
  );
};

export default FileList;
