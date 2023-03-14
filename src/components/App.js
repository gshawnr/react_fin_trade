import "./App.css";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "./context/authContext";

import Home from "../components/Home";

function App() {
  const { state } = useContext(AuthContext);
  console.log("auth state", state);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
