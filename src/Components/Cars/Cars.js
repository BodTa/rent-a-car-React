import React, { useEffect } from "react";
import axios from "../../api/axios";
import useCars from "../../hooks/useCars";
import Card from "./Card";

const Cars = () => {
  const { cars, setCars } = useCars();
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
  // Images coming from car dto no need this.
  //  useEffect(() => {
  //    const getImages = async () => {
  //      try {
  //        const response = await axios.get("/images/getall", {
  //          withCredentials: true,
  //        });
  //        setCarImages(response.data);
  //      } catch (error) {}
  //    };
  //    getImages();
  //    return () => {};
  //  }, [])
  const carCard = cars?.map((car) => {
    return (
      <Card
        key={car.carId}
        brandName={car.brandName}
        carName={car.carName}
        dailyPrice={car.dailyPrice}
        modelYear={car.modelYear}
        description={car.description}
        imagePath={car.images[0].imagePath}
      />
    );
  });
  return <div className="car-container">{carCard}</div>;
};

export default Cars;
