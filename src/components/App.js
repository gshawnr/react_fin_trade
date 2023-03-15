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

function App() {
  const { state: authState } = useContext(AuthContext);
  navigationHelper.navigate = useNavigate();
  navigationHelper.locaction = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/summary" element={<Summary />} />
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
