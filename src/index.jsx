import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignIn from "./pages/SignIn";
import Films from "./pages/Films";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="films" element={<Films />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
