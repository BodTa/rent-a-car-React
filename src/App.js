import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Rent from "./Components/Rent/Rent";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import Main from "./Components/Main/Main";
import Cars from "./Components/Cars/Cars";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="cars" element={<Cars />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/*Protected Routes */}
        <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
          <Route path="rent" element={<Rent />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
