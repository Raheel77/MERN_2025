import React from "react";
import { createRoot } from "react-dom/client";
import viteLogo from "/vite.svg";
import App from "./App";

const mainDiv = document.getElementById("root");

createRoot(mainDiv).render(
  <div>
    <App />
  </div>
);
