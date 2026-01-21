import React from "react";
import { Link } from "react-router-dom";
import Navigation_buttons from "./Navigation_buttons";

export default function Navi() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">All Users</Link>
        </li>
        <li>
          <Link to="/users/20">SIngle User</Link>
        </li>
      </ul>

      <Navigation_buttons />
    </div>
  );
}
