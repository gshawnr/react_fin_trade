import React, { useContext } from "react";

import { Context as AuthContext } from "../context/authContext";

import "./Home.css";

const Home = () => {
  const { state: authState } = useContext(AuthContext);
  return <div className="home-container" />;
};

export default Home;
