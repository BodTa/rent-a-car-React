import React from "react";
import Select from "react-select";
import "./CarAdd.css";
import { motion } from "framer-motion";
import FileUpload from "./FileUpload";
import FileList from "./FileList";
const CarAddForm = ({
  imgFiles,
  carTypeOptions,
  brandOptions,
  colorOptions,
  handleCarAdd,
  gearOptions,
  setCarModel,
  doorOpitons,
  setModelYear,
  setHorsePower,
  setEngineCapacity,
  setKilometer,
  setImgFiles,
  setBrand,
  fuelOptions,
  setColor,
  setDailyPrice,
  setGearType,
  setFuelType,
  setDoorCount,
  setDescription,
  uploadHandler,
  setCarType,
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
            isClearable
            onChange={setBrand}
            required
          />
          <input
            type="text"
            placeholder="Model"
            onChange={(e) => setCarModel(e.target.value)}
            required
          />
          <Select
            options={carTypeOptions}
            isSearchable
            placeholder="Car Type"
            isClearable
            onChange={setCarType}
            required
          />
          <Select
            options={colorOptions}
            isSearchable
            onChange={setColor}
            placeholder="Color"
            isClearable
            required
          />
          <input
            type="number"
            min="1886"
            max={new Date().getFullYear()}
            onChange={(e) => setModelYear(e.target.value)}
            placeholder="Model Year"
            required
          />

          <Select
            options={doorOpitons}
            isSearchable
            placeholder="Door Count"
            isClearable
            onChange={setDoorCount}
            required
          />
          <input
            type="number"
            min="120"
            max="1000"
            placeholder="Horse Power (HP)"
            onChange={(e) => setHorsePower(e.target.value)}
            required
          />
          <input
            type="number"
            min="100"
            max="6500"
            placeholder="Engine Capacity (CC)"
            onChange={(e) => setEngineCapacity(e.target.value)}
            required
          />
          <input
            type="number"
            min="0"
            max="4999999"
            placeholder="Kilometer"
            onChange={(e) => setKilometer(e.target.value)}
            required
          />
          <Select
            options={gearOptions}
            isSearchable
            onChange={setGearType}
            placeholder="Gear Type"
            isClearable
            required
          />
          <Select
            options={fuelOptions}
            isSearchable
            placeholder="Fuel Type"
            isClearable
            onChange={setFuelType}
            required
          />
          <input
            type="number"
            min="10"
            placeholder="Daily Price"
            required
            onChange={(e) => setDailyPrice(e.target.value)}
          />
          <textarea
            className="about-car"
            type="text"
            placeholder="About Car"
            required
            onChange={(e) => setDescription(e.target.value)}
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
