import React from "react";
import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getProcede, editProcede, getAllModel } from "../api";
import { useParams } from "react-router-dom";

const DetailProcede = () => {
  const [procede, setProcede] = useState();
  const [procedeName, setProcedeName] = useState("");
  const [procedeDesc, setProcedeDesc] = useState("");
  const [procedeModel, setProcedeModel] = useState("");
  const [procedeTests, setProcedeTests] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [allModel, setAllModel] = useState([]);
  const params = useParams();

  useEffect(() => {
    getProcede(params?.name, setProcede);
    getAllModel(setAllModel);
  }, [params]);

  useEffect(() => {
    if (!procede) return;
    //@ts-ignore
    setProcedeName(procede?.name);
    //@ts-ignore
    setProcedeDesc(procede?.description);
    //@ts-ignore
    setProcedeModel("Test32");
    //@ts-ignore
    setProcedeTests(procede?.tests);
  }, [procede]);

  useEffect(() => {
    console.log("je maitrise tous les procédé", procedeModel);
  }, [procedeModel]);

  function edit() {
    editProcede(params?.name, {
      name: procedeName,
      description: procedeDesc,
      modele_freezbe: procedeModel,
      tests: procedeTests,
    });
  }

  return (
    <Stack alignItems="center" spacing={3}>
      <Typography variant="h3">Procede</Typography>
      <Button variant="contained" onClick={() => setIsEditing(true)}>
        Modifier
      </Button>
      <TextField
        label="Nom du procede"
        value={procedeName}
        onChange={(e) => setProcedeName(e?.target?.value)}
      />
      <TextField
        label="Description du procede"
        value={procedeDesc}
        onChange={(e) => setProcedeDesc(e?.target?.value)}
      />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          label="Model"
          value={procedeModel}
          onChange={(e: SelectChangeEvent) => setProcedeModel(e?.target?.value)}
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
        value={procedeTests}
        onChange={(e) => setProcedeTests(e?.target?.value)}
      />
      {isEditing ? (
        <Button
          variant="contained"
          onClick={() => {
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

export default DetailProcede;
