import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [activePath, setActivePath] = useState("");
  const [navlinksClass, setNavlinksClass] = useState("navlinks");
  let location = useLocation();

  useEffect(() => {
    const { pathname = null } = location;
    setActivePath(pathname);
  }, [location]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Companies", path: "/company" },
    { name: "Summary", path: "/summary" },
    { name: "Metrics", path: "/metric" },
    { name: "Login", path: "/login" },
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
              key={thisLink.name}
              className={activePath === thisLink.path ? "active-link" : ""}
              to={thisLink.path}
            >
              {thisLink.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
