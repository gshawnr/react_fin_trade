import "./App.css";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "../context/authContext";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Logout from "../screens/Logout";

function App() {
  const { state } = useContext(AuthContext);
  console.log("auth state", state);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Logout" element={<Logout />} />
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
