import React from "react";
import ReactDOM from "react-dom/client";
import dotenv from "dotenv";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import Nav from "./components/Nav";

dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container">
        <Nav />
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
