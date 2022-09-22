import React from "react";
import { useState, useEffect } from "react";
import { getAllIngredients, getAllModel, getAllProcede } from "../api/index";
import { Typography, Grid, Stack, Box } from "@mui/material";
import { useParams } from "react-router-dom";
const GridPage = () => {
  const [list, setList] = useState([]);
  const params = useParams();
  let temp: any;

  switch (params?.type) {
    case "model": {
      temp = getAllModel();
      break;
    }
    case "procede": {
      temp = getAllProcede();
      break;
    }
    case "ingredients": {
      temp = getAllIngredients();
      break;
    }
  }

  useEffect(() => {
    if (!temp) return;
    setList(temp?.data);
  }, [temp]);

  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
          {params?.type}
        </Typography>
        <Grid container>
          {list?.map((element) => (
            <Box
              sx={{
                height: "10vh",
                width: "20vw",
                boxShadow: "2px 0 5px black",
                borderRadius: "1vh",
                cursor: "pointer",
              }}
              key={element}
            >
              <Typography key={element} variant="h6">
                {element}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default GridPage;
