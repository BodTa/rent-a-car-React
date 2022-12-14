import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./Components/Load-Screen/Loading";
import Layout from "./Components/Layout/Layout";
import PersistLogin from "./Components/Login/PersistLogin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import useGeneral from "./hooks/useGeneral";

const Register = lazy(() => import("./Components/Register/Register"));
const Login = lazy(() => import("./Components/Login/Login"));
const Rent = lazy(() => import("./Components/Rent/Rent"));
const CarEdit = lazy(() => import("./Components/Car-Edit/CarEdit"));
const Unauthorized = lazy(() =>
  import("./Components/Unauthorized/Unauthorized")
);
const Cars = lazy(() => import("./Components/Cars/Cars"));
const CarInfo = lazy(() => import("./Components/Cars/CarInfo/CarInfo"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const CarAdd = lazy(() => import("./Components/Car-Add/CarAdd"));

function App() {
  const { ToastContainer } = useGeneral();
  return (
    <Suspense fallback={<Loading />}>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Cars />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="carinfo/:id" element={<CarInfo />} />
          {/*Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["user"]} />}>
              <Route path="profile/:sellerId" element={<Profile />} />
              <Route path="rent/:id" element={<Rent />} />
              <Route path="car-edit/:carId" element={<CarEdit />} />
              <Route path="car-add/:userId" element={<CarAdd />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
