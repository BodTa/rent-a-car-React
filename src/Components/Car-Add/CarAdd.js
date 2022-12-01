import React from "react";
import "./CarAdd.css";
import { useNavigate, useParams } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CarAddForm from "./CarAddForm";
const CarAdd = () => {
  const { userId } = useParams();
  const {
    brandOptions,
    colorOptions,
    fuelOptions,
    gearOptions,
    doorOpitons,
    carTypeOptions,
    notifySuccess,
    notifyError,
  } = useGeneral();
  const [carType, setCarType] = useState();
  const [carModel, setCarModel] = useState();
  const [modelYear, setModelYear] = useState();
  const [horsePower, setHorsePower] = useState();
  const [engineCapacity, setEngineCapacity] = useState();
  const [kilometer, setKilometer] = useState();
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [dailyPrice, setDailyPrice] = useState();
  const [gearType, setGearType] = useState();
  const [fuelType, setFuelType] = useState();
  const [doorCount, setDoorCount] = useState();
  const [description, setDescription] = useState();
  const [imgFiles, setImgFiles] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleCarAdd = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("SellerId", userId);
      fd.append("BrandId", brand?.value);
      fd.append("ColorId", color?.value);
      fd.append("CarModel", carModel);
      fd.append("CarType", carType?.label);
      fd.append("ModelYear", modelYear);
      fd.append("DailyPrice", dailyPrice);
      fd.append("Description", description);
      fd.append("DoorCount", doorCount?.label);
      fd.append("FuelType", fuelType?.label);
      fd.append("EngineCapacity", engineCapacity);
      fd.append("HorsePower", horsePower);
      fd.append("Kilometer", kilometer);
      fd.append("GearType", gearType?.label);
      imgFiles?.forEach((img) => {
        fd.append("files", img);
      });
      await axiosPrivate.post("/cars/addwithimages", fd);
      notifySuccess("Your vehicle can now be rented!");
      setTimeout(() => {
        // navigate("/");
      }, 1000);
    } catch (error) {
      notifyError("Car has not added successfuly...");
      console.log(error);
    }
  };
  return (
    <CarAddForm
      doorOpitons={doorOpitons}
      gearOptions={gearOptions}
      brandOptions={brandOptions}
      colorOptions={colorOptions}
      carTypeOptions={carTypeOptions}
      fuelOptions={fuelOptions}
      handleCarAdd={handleCarAdd}
      setCarType={setCarType}
      setCarModel={setCarModel}
      setModelYear={setModelYear}
      setHorsePower={setHorsePower}
      setEngineCapacity={setEngineCapacity}
      setKilometer={setKilometer}
      setBrand={setBrand}
      setColor={setColor}
      setDailyPrice={setDailyPrice}
      setGearType={setGearType}
      setFuelType={setFuelType}
      setDoorCount={setDoorCount}
      setDescription={setDescription}
      setImgFiles={setImgFiles}
      imgFiles={imgFiles}
    />
  );
};

export default CarAdd;
