import { Link } from "react-router-dom";
import React from "react";
// import { NavUserLog } from "../NavUserLog/NavUserLog";
// import "./nav.css";

export const NavBar = () => {
  return (
    <div>
      <Link to="/">New Account</Link>
      <span> | </span>
      <Link to="/deposit/">Deposit</Link>
      <span> | </span>
      <Link to="/withdrawal/">Withdraw</Link>
      <span> | </span>
      <Link to="/transfer/">Transfer</Link>
      <span> | </span>
      <Link to="/delete/">Delete User</Link>
    </div>
  );
};
