import React from "react";
import { useState, useEffect } from "react";
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
import { createProcede, getAllModel } from "../api";

const CreateProcede = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [test, setTest] = useState("");
  const [allModel, setAllModel] = useState([]);

  function create() {
    let IdModel = 0;
    allModel.map((temp: any) => {
      if (temp.name === model) {
        IdModel = parseInt(temp.IdModel);
      }
    });
    const procede = {
      name: name,
      description: description,
      IdModel: IdModel,
      tests: test,
    };
    createProcede(procede);
  }

  useEffect(() => {
    getAllModel(setAllModel);
  }, []);

  useEffect(() => {
    console.log(allModel);
  }, [allModel]);

  return (
    <Stack alignItems="center">
      <Typography variant="h3">Créer un procédé</Typography>
      <TextField
        label="Nom du procédé"
        value={name}
        onChange={(e) => setName(e?.target?.value)}
      />
      <TextField
        label="Description de l'ingrédient"
        value={description}
        onChange={(e) => setDescription(e?.target?.value)}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Model"
          value={model}
          onChange={(e: SelectChangeEvent) => setModel(e?.target?.value)}
          sx={{ width: "14vw" }}
        >
          {allModel?.map((element: any) => (
            <MenuItem key={element?.name} value={element?.name}>
              {element?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Etapes et description des tests"
        value={test}
        onChange={(e) => setTest(e?.target?.value)}
      />
      <Button variant="contained" onClick={() => create()}>
        Créer
      </Button>
    </Stack>
  );
};

export default CreateProcede;
