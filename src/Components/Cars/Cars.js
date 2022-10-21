import { MotionConfig } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

import useGeneral from "../../hooks/useGeneral";
import Card from "./Card";
import { motion } from "framer-motion";
const Cars = () => {
  const {
    auth,
    cars,
    setCars,
    favorites,
    setFavorites,
    carsTemp,
    setCarsTemp,
  } = useGeneral();

  // Getting user favorites
  useEffect(() => {
    const getFavs = async () => {
      try {
        if (auth?.accessToken) {
          const response = await axios.get(
            `/favorites/getbyuserid?userId=${auth?.userId}`
          );
          setFavorites(response.data);
        }
      } catch (error) {
        setFavorites();
        console.log(error);
      }
    };
    getFavs();
    return () => {
      setFavorites();
    };
  }, [auth]);

  // Getting cars data
  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get("/cars/getall", {
          withCredentials: true,
        });
        setCars(response.data.data);
        setCarsTemp(response.data.data);
      } catch (error) {}
    };
    getCars();
    return () => {};
  }, []);

  const carCard = cars?.map((car) => {
    const isFavorited = favorites?.some(({ carId }) => carId === car.carId);
    return (
      <Card
        key={car.carId}
        brandName={car.brandName}
        carName={car.carName}
        dailyPrice={car.dailyPrice}
        modelYear={car.modelYear}
        carId={car.carId}
        description={car.description}
        isFavorited={isFavorited}
        setFavorites={setFavorites}
        imagePath={"http://localhost:5149" + car.images[0].imagePath}
      />
    );
  });
  return <motion.div className="car-container">{carCard}</motion.div>;
};

export default Cars;
