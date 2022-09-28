import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getModel, getAllIngredients, editModel } from "../api";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

let modelIngredients: any[] = [];

const DetailModel = () => {
  const [model, setModel] = useState<null | {
    model: any;
    ingredients: Array<any>;
    name: string;
    Description: string;
    puht: string;
    Gamme: string;
  }>();
  const [allIngredients, setAllIngredients] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [puht, setPuht] = useState("");
  const [gamme, setGamme] = useState("");
  const [ingredientsName, setIngredientsName] = useState("");
  const [ingredientsGrammage, setIngredientsGrammage] = useState("");
  const [listIngredients, setListIngredients] = useState<any[]>([]);
  const params = useParams();

  useEffect(() => {
    if (!params) return;
    getModel(params?.name, setModel);
    getAllIngredients(setAllIngredients);
  }, [params]);

  useEffect(() => {
    console.log(model);
    if (!model) return;
    setName(model?.model.name);
    setDescription(model?.model.Description);
    setPuht(model?.model.puht);
    setGamme(model?.model.Gamme);
  }, [model]);

  useEffect(() => {
    if (!modelIngredients) return;
    setListIngredients(modelIngredients);
  }, [modelIngredients]);

  function addIngredient() {
    modelIngredients.push({
      name: ingredientsName,
      grammage: ingredientsGrammage,
    });
    setIngredientsName("");
    setIngredientsGrammage("");
  }

  function edit() {
    editModel({
      name: name,
      Description: description,
      puht: puht,
      Gamme: gamme,
    });
  }

  function deleteIngredient(index: any) {
    modelIngredients.splice(index, 1);
    setIngredientsName("");
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
        <Typography variant="h6">Model</Typography>
        <TextField
          label="Nom du model"
          value={name}
          onChange={(e) => setName(e?.target?.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e?.target?.value)}
        />
        <TextField
          label="PUHT"
          value={puht}
          onChange={(e) => setPuht(e?.target?.value)}
        />
        <TextField
          label="Gamme"
          value={gamme}
          onChange={(e) => setGamme(e?.target?.value)}
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
                  <MenuItem key={element?.name} value={element.name}>
                    {element.name}
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
        </Stack>
      </Stack>
      <Stack alignItems="center" spacing={2}>
        {model?.ingredients?.map((element: any, index) => (
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
              {element?.name}
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

export default DetailModel;
