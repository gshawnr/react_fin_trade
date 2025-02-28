import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import { navigationHelper } from "../utils/navigationHelper";
import Home from "../pages/Home";
import Company from "../pages/Company";
import Login from "../pages/Login";
import Metric from "../pages/Metric";
import Summary from "../pages/Summary";
import Watch from "../pages/Watch";

const AppRoutes = () => {
  navigationHelper.navigate = useNavigate();
  navigationHelper.location = useLocation();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/investing/company" element={<Company />} />
        <Route path="/investing/metric" element={<Metric />} />
        <Route path="/investing/summary" element={<Summary />} />
        <Route path="/investing/watch" element={<Watch />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
