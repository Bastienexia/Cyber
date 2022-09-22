import React from "react";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AccueilPage from "./pages/AccueilPage";
import GridPage from "./pages/GridPage";
import ProductPage from "./pages/ProductPage";
import { Routes, Route } from "react-router-dom";

function App() {
  const token = localStorage.getItem("accessToken");
  const tokenExpire = localStorage.getItem("accessTokenTime");
  const [isLog, setIsLog] = useState(false);

  if (token && tokenExpire && isLog === false) {
    const timePassed = Date.now() - parseInt(tokenExpire);

    if (timePassed < 3600000) {
      setIsLog(true);
    }
  }

  return (
    <div className="App">
      {isLog ? (
        <Routes>
          <Route path="/" element={<AccueilPage />} />
          <Route path="/listAll/:type" element={<GridPage />} />
          <Route path="/product/:type/:name" element={<ProductPage />} />
        </Routes>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
