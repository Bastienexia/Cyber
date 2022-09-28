import React from "react";
import { useState, useEffect } from "react";
import { getAllIngredients, createModel } from "../api";
import {
  Box,
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

let modelIngredients: any[] = [];

const CreateModel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [puht, setPuht] = useState("");
  const [gamme, setGamme] = useState("");
  const [ingredientsId, setIngredientsId] = useState("");
  const [ingredientsGrammage, setIngredientsGrammage] = useState("");

  const [allIngredients, setAllIngredients] = useState([]);
  const [listIngredients, setListIngredients] = useState([]);

  useEffect(() => {
    getAllIngredients(setAllIngredients);
  }, []);

  useEffect(() => {
    //@ts-ignore
    setListIngredients(modelIngredients);
  }, []);

  function addIngredient() {
    let IdIngredient = 0;
    allIngredients.map((ingredient: any) => {
      console.log(ingredient);
      if (ingredient?.NomIngredient === ingredientsId) {
        IdIngredient = parseInt(ingredient.IdIngredient);
      }
    });
    modelIngredients.push({
      IdIngredient: IdIngredient,
      grammage: ingredientsGrammage,
    });
    setIngredientsId("");
    setIngredientsGrammage("");
  }

  function create() {
    const model = {
      name: name,
      Description: description,
      puht: puht,
      Gamme: gamme,
      ingredients: listIngredients,
    };
    createModel({ model: model, ingredients: listIngredients });
  }

  function deleteIngredient(index: any) {
    modelIngredients.splice(index, 1);
    setIngredientsId("");
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={6}
      sx={{ width: "80vw", marginLeft: "10vw" }}
    >
      <Stack alignItems="center">
        <Typography variant="h3">Créer un model</Typography>
        <Button onClick={() => console.log(listIngredients)}>show</Button>
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
                value={ingredientsId}
                onChange={(e: SelectChangeEvent) =>
                  setIngredientsId(e?.target?.value)
                }
                sx={{ width: "14vw" }}
              >
                {allIngredients?.map((element: any) => (
                  <MenuItem value={element.NomIngredient}>
                    {element.NomIngredient}
                  </MenuItem>
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
      <Stack alignItems="center" spacing={2}>
        {listIngredients?.map((element: any, index) => (
          <Box
            sx={{
              width: "20vw",
              boxShadow: "2px 0 5px black",
              borderRadius: "1vh",
              cursor: "pointer",
              background: "grey",
            }}
            key={index}
            onClick={() => deleteIngredient(index)}
          >
            <Typography variant="h5" key={index}>
              {element?.IdIngredient}
            </Typography>
            <Typography variant="h6" key={index}>
              {element?.grammage}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default CreateModel;
