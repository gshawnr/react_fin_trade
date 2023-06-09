import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "../context/authContext";

import { navigationHelper } from "../utils/navigationHelper";

import About from "../screens/About";
import Company from "../screens/Company";
import Home from "../screens/Home";
import Investing from "../screens/Investing";
import Login from "../screens/Login";
import Metric from "../screens/Metric";
import Summary from "../screens/Summary";

function App() {
  const { state: authState } = useContext(AuthContext);
  navigationHelper.navigate = useNavigate();
  navigationHelper.location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/investing" element={<Investing />} />
      <Route path="/investing/summary" element={<Summary />} />
      <Route path="/investing/metric" element={<Metric />} />
      <Route path="/investing/company" element={<Company />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const appExport = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default appExport;
