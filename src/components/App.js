import "./App.css";
import React, { useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "../context/authContext";

import { navigationHelper } from "../utils/navigationHelper";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Summary from "../screens/Summary";
import Metric from "../screens/Metric";
import Company from "../screens/Company";

function App() {
  const { state: authState } = useContext(AuthContext);
  navigationHelper.navigate = useNavigate();
  navigationHelper.locaction = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company" element={<Company />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/metric" element={<Metric />} />
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
