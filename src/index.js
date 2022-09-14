import React from "react";
import ReactDOM from "react-dom/client";
import {SkeletonTheme} from 'react-loading-skeleton'
import { StoreContextProvider } from "./store/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SkeletonTheme baseColor="#abaaa9" highlightColor="#fff">
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </SkeletonTheme>
);
