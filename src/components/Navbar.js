import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
  const logout = () => {
    props.logOut();
    props.toggleNav();
  };

  return (
    <div className={props.class ? "navbar" : "navbar slide"}>
      <ul>
        <Link
          onClick={props.toggleNav}
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to="/"
        >
          <li>Dashboard</li>
        </Link>
        <Link
          onClick={props.toggleNav}
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to="/calendar"
        >
          <li>Your Training</li>
        </Link>
        <Link
          onClick={props.toggleNav}
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to="/friends"
        >
          <li>Community</li>
        </Link>
        <Link
          onClick={props.toggleNav}
          onClick={logout}
          style={{
            color: "white",
            textDecoration: "none",
          }}
          to="/"
        >
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};
