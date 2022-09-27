import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AccueilPage from "./pages/AccueilPage";
import GridPage from "./pages/GridPage";
import ProductPage from "./pages/ProductPage";
import CreateIngredient from "./pages/CreateIngredient";
import CreateProcede from "./pages/CreateProcede";
import CreateModel from "./pages/CreateModel";
import DetailIngredient from "./pages/DetailIngredient";
import DetailProcede from "./pages/DetailProcede";
import DetailModel from "./pages/DetailModel";
import { Button } from "@mui/material";

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
        <>
          <Link to="/">
            <Button
              sx={{ position: "absolute", top: "25px", left: "25px" }}
              variant="contained"
            >
              Retour à l'accueil
            </Button>
          </Link>
          <Routes>
            <Route path="/" element={<AccueilPage />} />
            <Route path="/listAll/:type" element={<GridPage />} />
            <Route path="/product/:type/:name" element={<ProductPage />} />
            <Route path="/create/ingredients" element={<CreateIngredient />} />
            <Route path="/create/procede" element={<CreateProcede />} />
            <Route path="/create/model" element={<CreateModel />} />
            <Route
              path="/detail/ingredients/:name"
              element={<DetailIngredient />}
            />
            <Route path="/detail/procede/:name" element={<DetailProcede />} />
            <Route path="/detail/model/:name" element={<DetailModel />} />
          </Routes>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
