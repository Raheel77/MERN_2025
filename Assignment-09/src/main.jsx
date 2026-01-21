import React from "react";
import { createRoot } from "react-dom/client";
import viteLogo from "/vite.svg";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const mainDiv = document.getElementById("root");

createRoot(mainDiv).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
