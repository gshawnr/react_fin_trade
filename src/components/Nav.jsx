import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  const [activePath, setActivePath] = useState("");
  const [navlinksClass, setNavlinksClass] = useState("navlinks");
  const [investingLinksClass, setInvestingLinksClass] = useState("sublinks");

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const { pathname = null } = location;
    setActivePath(pathname);
  }, [location]);

  const links = [
    { name: "Home", path: "/" },
    {
      name: "Investing",
      path: "/investing",
      className: "investing-dropdown",
      sublinks: [
        { name: "Companies", path: "/investing/company" },
        { name: "Summaries", path: "/investing/summary" },
        { name: "Metrics", path: "/investing/metric" },
      ],
    },
  ];

  const navExpand = (e, linkName) => {
    e.preventDefault();
    if (linkName === "Investing") {
      setInvestingLinksClass((prev) => {
        if (prev === "sublinks") return "sublinks sublinks-expand";
        else return "sublinks";
      });
    } else
      setNavlinksClass((prev) => {
        if (prev === "navlinks") return "navlinks navlinks-expand";
        else return "navlinks";
      });
  };

  return (
    <nav>
      <div className="navbar">
        <a href="#" className="hamburger" onClick={(e) => navExpand(e)}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </a>
        <div className={navlinksClass}>
          <div>
            <Link
              variant="contained"
              key="/"
              className={activePath === "/" ? "active-link" : ""}
              to="/"
            >
              Home
            </Link>
          </div>
          <div className="investing">
            <Link
              variant="contained"
              key="/investing"
              className={activePath === "/investing" ? "active-link" : ""}
              to="/investing"
            >
              Investing
            </Link>
            <div className="sublinks investing-sublinks">
              <Link
                variant="contained"
                key="/investing/company"
                className={
                  activePath === "/investing/company" ? "active-link" : ""
                }
                to="/investing/company"
              >
                Companies
              </Link>
              <Link
                variant="contained"
                key="/investing/summary"
                className={
                  activePath === "/investing/summary" ? "active-link" : ""
                }
                to="/investing/summary"
              >
                Summaries
              </Link>
              <Link
                variant="contained"
                key="/investing/metric"
                className={
                  activePath === "/investing/metric" ? "active-link" : ""
                }
                to="/investing/metric"
              >
                Metrics
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", right: "10%" }}>
        <Button variant="contained" onClick={(e) => navigate("/login")}>
          Login
        </Button>
      </div>
    </nav>
  );
}

export default Nav;
