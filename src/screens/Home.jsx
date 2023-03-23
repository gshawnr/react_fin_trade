import React, { useContext } from "react";

import { Context as AuthContext } from "../context/authContext";

import "./Home.css";

const Home = () => {
  const { state: authState } = useContext(AuthContext);
  return <h1>Home</h1>;
};

export default Home;
