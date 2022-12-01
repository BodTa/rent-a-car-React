import axios from "../../api/axios";

const getAll = async () => {
  try {
    const response = await axios.get("/cars/getall");
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export default getAll;
