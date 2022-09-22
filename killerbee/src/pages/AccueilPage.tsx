import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AccueilPage = () => {
  return (
    <Stack alignItems="center">
      <Typography variant="h1">Accueil</Typography>
      <Box>
        <Stack direction="row" spacing={2}>
          <Link to="/listAll/model">
            <Box
              sx={{
                width: "15vw",
                height: "15vh",
                borderRadius: "5%",
                background: "grey",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6">Modèles</Typography>
            </Box>
          </Link>
          <Link to="/listAll/procede">
            <Box
              sx={{
                width: "15vw",
                height: "15vh",
                borderRadius: "5%",
                background: "grey",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6">Procédés</Typography>
            </Box>
          </Link>
          <Link to="/listAll/ingredients">
            <Box
              sx={{
                width: "15vw",
                height: "15vh",
                borderRadius: "5%",
                background: "grey",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6">Ingrédients</Typography>
            </Box>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AccueilPage;
