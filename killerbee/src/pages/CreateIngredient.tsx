import React from "react";
import { useState } from "react";
import { Stack, TextField, Button, Typography } from "@mui/material";
import { createIngredient } from "../api/index";

const CreateIngredient = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function create() {
    const ingredient = { NomIngredient: name, Description: description };
    createIngredient(ingredient);
  }

  return (
    <Stack alignItems="center">
      <Typography variant="h3">Créer un Ingrédients</Typography>
      <TextField
        label="Nom de l'ingrédient"
        value={name}
        onChange={(e) => setName(e?.target?.value)}
      />
      <TextField
        label="Description de l'ingrédient"
        value={description}
        onChange={(e) => setDescription(e?.target?.value)}
      />
      <Button variant="contained" onClick={() => create()}>
        Créer
      </Button>
    </Stack>
  );
};

export default CreateIngredient;
