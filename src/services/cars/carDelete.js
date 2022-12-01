const carDelete = async (id, axiosPrivate) => {
  try {
    await axiosPrivate.post("/cars/deletewithcarid", JSON.stringify(id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default carDelete;
