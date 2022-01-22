import { Link } from "react-router-dom";
import React from "react";
// import { NavUserLog } from "../NavUserLog/NavUserLog";
// import "./nav.css";

export const NavBar = () => {
  return (
    <div>
      <Link to="/">New Account</Link>
      {/* <Link className="nav-button" to="/compare/">
        Compare States
      </Link>

      <Link className="nav-button" to="/wanted/">
        Wanted List
      </Link>
      <Link className="nav-button" to="/signup/">
        Sign up
      </Link> */}
    </div>
  );
};
