import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const uid = localStorage.getItem('uid')

  return (
    <nav className="navbar">
      <div className="navbar section">
        <Link to={"/home"} id="title">
          Tweeker
        </Link>

        <ul className="nav-elements">
          <li>
            <NavLink to={"/home"} id="home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/" + (uid || "notfound")} id="profile">
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
