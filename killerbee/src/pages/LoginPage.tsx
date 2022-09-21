import React from "react";
import { useState } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Connexion } from "../api/authentification";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "40vw", height: "40vh", background: "grey" }}
      >
        <Typography variant="h6">Connectez-vous</Typography>
        <TextField
          sx={{ width: "70%" }}
          label="Adresse mail"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: "70%" }}
          label="Mot de passe"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => Connexion(email, password)} variant="outlined">
          Connexion
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPage;
