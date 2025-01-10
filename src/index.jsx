import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";

const container = document.getElementById("root");
const root = createRoot(container);

// Dev
// const baseurl = window.location.hostname=='localhost'?'': "/apps/ringbuilderdev";
// Live
const baseurl = window.location.hostname=='localhost'?'': "/apps/ringbuilder";

root.render(
  <BrowserRouter basename={baseurl}>
    <App />
  </BrowserRouter>,
  
);

reportWebVitals();
