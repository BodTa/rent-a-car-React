import { MotionConfig } from "framer-motion";
import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import axios from "../../api/axios";
import carGetAll from "../../services/cars/carGetAll";
import useGeneral from "../../hooks/useGeneral";
import { motion } from "framer-motion";
import Loading from "../Load-Screen/Loading";
const Cars = () => {
  const Card = lazy(() => import("./Card"));
  const abort = new AbortController();
  const { auth, cars, setCars, favorites, setFavorites, setCarsTemp, isDark } =
    useGeneral();
  // Getting user favorites
  useEffect(() => {
    const getFavs = async () => {
      try {
        if (auth.userId) {
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
    const handleCars = async () => {
      const response = await carGetAll();
      setCars(response);
      setCarsTemp(response);
    };
    handleCars();
    return () => {};
  }, []);

  const carCard = cars?.map((car) => {
    const isFavorited = favorites?.some(({ carId }) => carId === car.carId);
    return (
      <Card
        key={car.carId}
        brandName={car.brandName}
        carModel={car.carModel}
        dailyPrice={car.dailyPrice}
        modelYear={car.modelYear}
        carId={car.carId}
        description={car.description}
        isFavorited={isFavorited}
        setFavorites={setFavorites}
        isDark={isDark}
        imagePath={"http://localhost:5149" + car.images[0]?.imagePath}
      />
    );
  });
  return (
    <Suspense fallback={<Loading />}>
      <motion.div className="car-container">{carCard}</motion.div>
    </Suspense>
  );
};

export default Cars;
