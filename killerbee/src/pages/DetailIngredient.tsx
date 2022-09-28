import React from "react";
import { useState, useEffect } from "react";
import { Stack, Box, TextField, Typography, Button } from "@mui/material";
import { getIngredient, editIngredient } from "../api";
import { useParams } from "react-router-dom";

const DetailIngredient = () => {
  const [ingredient, setIngredient] = useState();
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientDesc, setIngredientDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();

  useEffect(() => {
    getIngredient(params?.name, setIngredient);
  }, [params]);

  useEffect(() => {
    console.log(ingredient);
  }, [ingredient]);
  useEffect(() => {
    //@ts-ignore
    setIngredientName(ingredient?.NomIngredient);
    //@ts-ignore
    setIngredientDesc(ingredient?.Description);
  }, [ingredient]);

  function edit() {
    editIngredient(params?.name, {
      NomIngredient: ingredientName,
      Description: ingredientDesc,
    });
  }

  return (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h6">Ingrédient</Typography>
      <Button variant="contained" onClick={() => setIsEditing(true)}>
        Modifier
      </Button>
      <TextField
        label="Nom de l'ingrédient"
        value={ingredientName}
        onChange={(e) => setIngredientName(e?.target?.value)}
      />
      <TextField
        sx={{
          width: "25vw",
          height: "25vh",
        }}
        label="Description"
        value={ingredientDesc}
        onChange={(e) => setIngredientDesc(e?.target?.value)}
      />
      {isEditing ? (
        <Button
          variant="contained"
          onClick={() => {
            //@ts-ignore
            edit();
            setIsEditing(false);
          }}
        >
          Enregistrer les modifications
        </Button>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default DetailIngredient;
