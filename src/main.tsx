import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const containerElement = document.getElementById("root");
if (containerElement) {
  createRoot(containerElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
