import React from "react";
import Select from "react-select";
import "./CarAdd.css";
import { motion } from "framer-motion";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
const CarAddForm = ({
  imgFiles,
  uploadHandler,
  fuelOptions,
  carTypeOptions,
  brandOptions,
  colorOptions,
  handleCarAdd,
  gearOptions,
  doorOpitons,
  setImgFiles,
  carTypeAttribute,
  carModelAttribute,
  modelYearAttribute,
  horsePowerAttribute,
  engineCapacityAttribute,
  kilometerAttribute,
  brandAttribute,
  colorAttribute,
  dailyPriceAttribute,
  gearTypeAttribute,
  fuelTypeAttribute,
  doorCountAttribute,
  descriptionAttribute,
}) => {
  return (
    <div className="car-add-container">
      <div className="car-add-car-infos">
        <form
          className="car-add-car-infos-form"
          onSubmit={async (e) => handleCarAdd(e)}
        >
          <Select
            options={brandOptions}
            isSearchable
            placeholder="Brand"
            {...brandAttribute}
            isClearable
            required
          />
          <input
            type="text"
            placeholder="Model"
            {...carModelAttribute}
            required
          />
          <Select
            options={carTypeOptions}
            isSearchable
            placeholder="Car Type"
            isClearable
            {...carTypeAttribute}
            required
          />
          <Select
            options={colorOptions}
            isSearchable
            {...colorAttribute}
            placeholder="Color"
            isClearable
            required
          />
          <input
            type="number"
            min="1886"
            max={new Date().getFullYear()}
            {...modelYearAttribute}
            placeholder="Model Year"
            required
          />

          <Select
            options={doorOpitons}
            isSearchable
            placeholder="Door Count"
            isClearable
            {...doorCountAttribute}
            required
          />
          <input
            type="number"
            min="120"
            max="1000"
            placeholder="Horse Power (HP)"
            {...horsePowerAttribute}
            required
          />
          <input
            type="number"
            min="100"
            max="6500"
            placeholder="Engine Capacity (CC)"
            {...engineCapacityAttribute}
            required
          />
          <input
            type="number"
            min="0"
            max="4999999"
            placeholder="Kilometer"
            {...kilometerAttribute}
            required
          />
          <Select
            options={gearOptions}
            isSearchable
            {...gearTypeAttribute}
            placeholder="Gear Type"
            isClearable
            required
          />
          <Select
            options={fuelOptions}
            isSearchable
            placeholder="Fuel Type"
            isClearable
            {...fuelTypeAttribute}
            required
          />
          <input
            type="number"
            min="10"
            placeholder="Daily Price"
            required
            {...dailyPriceAttribute}
          />
          <textarea
            className="about-car"
            type="text"
            placeholder="About Car"
            required
            {...descriptionAttribute}
          />
          <button className="car-add-button">Rent Your Car!</button>
        </form>
      </div>
      <motion.div className="car-add-images">
        <FileUpload
          imgFiles={imgFiles}
          setImgFiles={setImgFiles}
          uploadHandler={uploadHandler}
        />
        <FileList imgFiles={imgFiles} setImgFiles={setImgFiles} />
      </motion.div>
    </div>
  );
};

export default CarAddForm;
