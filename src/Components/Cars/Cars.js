import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useGeneral from "../../hooks/useGeneral";
import Card from "./Card";
const Cars = () => {
  const { auth } = useAuth();
  const { cars, setCars, favorites, setFavorites } = useGeneral();
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
        console.log(error);
      }
    };
    getFavs();
    return () => {};
  }, []);
  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get("/cars/getall", {
          withCredentials: true,
        });
        setCars(response.data.data);
      } catch (error) {}
    };
    getCars();
    return () => {};
  }, []);

  const carCard = cars?.map((car) => {
    const isFavorited = favorites.some(({ carId }) => carId === car.carId);
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
  return <div className="car-container">{carCard}</div>;
};

export default Cars;
