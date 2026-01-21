import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation_buttons() {
  let navigate = useNavigate();
  return (
    <div>
      <ul>
        <li>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </button>
        </li>
      </ul>
    </div>
  );
}
