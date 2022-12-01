import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";
import Select from "react-select";
import "./CarEdit.css";
import { useEffect } from "react";
const CarEdit = ({}) => {
  const {
    cars,
    auth,
    brandOptions,
    colorOptions,
    fuelOptions,
    gearOptions,
    doorOpitons,
    carTypeOptions,
  } = useGeneral();
  const [carToEdit, setCarToEdit] = useState();
  const currentCarId = useParams();
  useEffect(() => {
    setCarToEdit(cars?.find(({ carId }) => carId == currentCarId));
    console.log("Car To Edit" + carToEdit);
    return () => {};
  }, []);
  const [carType, setCarType] = useState();
  const [brand, setBrand] = useState(
    brandOptions.filter(({ label }) => label == carToEdit?.brandName)
  );
  console.log(brand);
  const [color, setColor] = useState();
  const [gearType, setGearType] = useState();
  const [fuelType, setFuelType] = useState();
  const [doorCount, setDoorCount] = useState();

  return (
    <div className="car-edit-container">
      <form className="car-add-car-infos-form">
        <Select
          options={brandOptions}
          isSearchable
          value={brand}
          isClearable
          onChange={setBrand}
          required
        />
        <input
          type="text"
          placeholder="Model"
          onChange={(e) => (carToEdit.CarType = e.target.value)}
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
          onChange={(e) => (carToEdit.modelYear = e.target.value)}
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
          onChange={(e) => (carToEdit.horsePower = e.target.value)}
          required
        />
        <input
          type="number"
          min="100"
          max="6500"
          placeholder="Engine Capacity (CC)"
          onChange={(e) => (carToEdit.engineCapacity = e.target.value)}
          required
        />
        <input
          type="number"
          min="0"
          max="4999999"
          placeholder="Kilometer"
          onChange={(e) => (carToEdit.kilometer = e.target.value)}
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
          onChange={(e) => (carToEdit.dailyPrice = e.target.value)}
        />
        <textarea
          className="about-car"
          type="text"
          placeholder="About Car"
          required
          onChange={(e) => (carToEdit.description = e.target.value)}
        />
        <button className="car-add-button">Rent Your Car!</button>
      </form>
    </div>
  );
};

export default CarEdit;
