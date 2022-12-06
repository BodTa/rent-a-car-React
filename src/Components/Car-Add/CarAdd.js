import React from "react";
import "./CarAdd.css";
import { useNavigate, useParams } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CarAddForm from "./CarAddForm";
import useOptions from "../../hooks/useOptions";
import useInput from "../../hooks/useInput";
import useSelectInput from "../../hooks/useSelectInput";
const CarAdd = () => {
  const { userId } = useParams();
  const { brandOptions, colorOptions, notifySuccess, notifyError } =
    useGeneral();
  const { fuelOptions, gearOptions, doorOpitons, carTypeOptions } =
    useOptions();
  const [carType, resetCarType, carTypeAttribute] = useSelectInput("carType", {
    value: 0,
    label: "Car Type",
  });
  const [carModel, resetCarModel, carModelAttribute] = useInput("carModel", "");
  const [modelYear, resetModelYear, modelYearAttribute] = useInput(
    "modelYear",
    "Model Year"
  );
  const [horsePower, resetHorsePower, horsePowerAttribute] = useInput(
    "horsePower",
    "Horse Power"
  );
  const [engineCapacity, resetEngineCapacity, engineCapacityAttribute] =
    useInput("engineCapacity", "Engine Capacity");
  const [kilometer, resetKilometer, kilometerAttribute] = useInput(
    "kilometer",
    "Kilometer"
  );
  const [brand, resetBrand, brandAttribute] = useSelectInput("brand", {
    value: 0,
    label: "Brand",
  });
  const [color, resetColor, colorAttribute] = useSelectInput("color", {
    value: 0,
    label: "Color",
  });
  const [dailyPrice, resetDailyPrice, dailyPriceAttribute] = useInput(
    "dailyPrice",
    "Daily Price"
  );
  const [gearType, resetGearType, gearTypeAttribute] = useSelectInput(
    "gearType",
    { value: 0, label: "Gear Type" }
  );
  const [fuelType, resetFuelType, fuelTypeAttribute] = useSelectInput(
    "fuelType",
    { value: 0, label: "Fuel Type" }
  );
  const [doorCount, resetDoorCount, doorCountAttribute] = useSelectInput(
    "doorCount",
    { value: 0, label: "Door Count" }
  );
  const [description, resetDescription, descriptionAttribute] = useInput(
    "description",
    ""
  );
  const [imgFiles, setImgFiles] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleCarAdd = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("carModel");
      localStorage.removeItem("carType");
      localStorage.removeItem("description");
      localStorage.removeItem("doorCount");
      localStorage.removeItem("fuelType");
      localStorage.removeItem("gearType");
      localStorage.removeItem("dailyPrice");
      localStorage.removeItem("color");
      localStorage.removeItem("brand");
      localStorage.removeItem("modelYear");
      localStorage.removeItem("horsePower");
      localStorage.removeItem("engineCapacity");
      localStorage.removeItem("kilometer");

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
      carTypeAttribute={carTypeAttribute}
      carModelAttribute={carModelAttribute}
      modelYearAttribute={modelYearAttribute}
      horsePowerAttribute={horsePowerAttribute}
      engineCapacityAttribute={engineCapacityAttribute}
      kilometerAttribute={kilometerAttribute}
      brandAttribute={brandAttribute}
      colorAttribute={colorAttribute}
      dailyPriceAttribute={dailyPriceAttribute}
      gearTypeAttribute={gearTypeAttribute}
      fuelTypeAttribute={fuelTypeAttribute}
      doorCountAttribute={doorCountAttribute}
      descriptionAttribute={descriptionAttribute}
      setImgFiles={setImgFiles}
      imgFiles={imgFiles}
    />
  );
};

export default CarAdd;
