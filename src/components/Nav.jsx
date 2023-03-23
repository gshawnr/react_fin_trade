import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  const [activePath, setActivePath] = useState("");
  const [navlinksClass, setNavlinksClass] = useState("navlinks");
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const { pathname = null } = location;
    setActivePath(pathname);
  }, [location]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Companies", path: "/company" },
    { name: "Summary", path: "/summary" },
    { name: "Metrics", path: "/metric" },
  ];

  const navExpand = (e) => {
    e.preventDefault();
    setNavlinksClass((prev) => {
      if (prev === "navlinks") return "navlinks navlinks-expand";
      else return "navlinks";
    });
  };

  return (
    <nav>
      <div className="navbar">
        <a href="#" className="hamburger" onClick={navExpand}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </a>
        <div className={navlinksClass}>
          {links.map((thisLink) => (
            <Link
              variant="contained"
              key={thisLink.name}
              className={activePath === thisLink.path ? "active-link" : ""}
              to={thisLink.path}
            >
              {thisLink.name}
            </Link>
          ))}
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
