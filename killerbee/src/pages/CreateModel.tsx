import React from "react";
import { useState, useEffect } from "react";
import { getAllIngredients, createModel } from "../api";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const CreateModel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [puht, setPuht] = useState("");
  const [gamme, setGamme] = useState("");
  const [ingredientsName, setIngredientsName] = useState("");
  const [ingredientsGrammage, setIngredientsGrammage] = useState("");
  let modelIngredients: any[] = [];
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    getAllIngredients(setAllIngredients);
  }, []);

  function addIngredient() {
    const ingredientObject = {
      name: ingredientsName,
      grammage: ingredientsGrammage,
    };
    modelIngredients = [...modelIngredients, ingredientObject];
    console.log(modelIngredients);
  }

  function create() {
    const model = {
      name: name,
      description: description,
      puht: puht,
      gamme: gamme,
      ingredients: modelIngredients,
    };
    createModel(model);
  }

  return (
    <Stack alignItems="center">
      <Typography variant="h3">Créer un model</Typography>
      <Button onClick={() => console.log(modelIngredients)}>show</Button>
      <TextField
        label="Nom du model"
        value={name}
        onChange={(e) => setName(e?.target?.value)}
      />
      <TextField
        label="Description de l'ingrédient"
        value={description}
        onChange={(e) => setDescription(e?.target?.value)}
      />
      <TextField
        label="puht"
        value={puht}
        onChange={(e) => setPuht(e?.target?.value)}
      />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Gamme</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Gamme"
          value={gamme}
          onChange={(e: SelectChangeEvent) => setGamme(e?.target?.value)}
          sx={{ width: "14vw" }}
        >
          <MenuItem value="Entrée de gamme">Entrée de gamme</MenuItem>
          <MenuItem value="Mileu de gamme">Mileu de gamme</MenuItem>
          <MenuItem value="Haut de gamme">Haut de gamme</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Stack>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Ingrédient
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label="Ingrédient"
              value={ingredientsName}
              onChange={(e: SelectChangeEvent) =>
                setIngredientsName(e?.target?.value)
              }
              sx={{ width: "14vw" }}
            >
              {allIngredients?.map((element: any) => (
                <MenuItem value={element.name}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Grammage"
            value={ingredientsGrammage}
            onChange={(e) => setIngredientsGrammage(e?.target?.value)}
          />
        </Stack>
        <Button
          sx={{ height: "5vh" }}
          variant="contained"
          onClick={() => addIngredient()}
        >
          Ajouter l'ingrédient
        </Button>
      </Stack>
      <Button variant="contained" onClick={() => create()}>
        Créer
      </Button>
    </Stack>
  );
};

export default CreateModel;
