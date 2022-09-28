import React from "react";
import { useState, useEffect } from "react";
import { getAllIngredients, getAllModel, getAllProcede } from "../api/index";
import { Typography, Grid, Stack, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const GridPage = () => {
  const [list, setList] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.type === "model") {
      getAllModel(setList);
    } else if (params?.type === "procede") {
      getAllProcede(setList);
      console.log(list);
    } else if (params?.type === "ingredients") {
      getAllIngredients(setList);
    }
  }, [params]);

  return (
    <>
      <Stack alignItems="center">
        <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
          {params?.type}
        </Typography>
        <Link to={"/create/" + params?.type}>
          <Button variant="contained">Nouveau</Button>
        </Link>
        <Grid container spacing={3} sx={{ width: "80vw", marginleft: "10vw" }}>
          {list?.map((element: any) => (
            <Link
              to={
                "/detail/" +
                params?.type +
                "/" +
                (element.NomIngredient || element.name || element)
              }
            >
              <Grid item key={element.NomIngredient || element.name || element}>
                <Box
                  sx={{
                    width: "20vw",
                    boxShadow: "2px 0 5px black",
                    borderRadius: "1vh",
                    cursor: "pointer",
                  }}
                  key={element}
                >
                  <Typography
                    key={element.NomIngredient || element.name || element}
                    variant="h6"
                  >
                    {element.NomIngredient || element.name || element}
                  </Typography>
                </Box>
              </Grid>
            </Link>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default GridPage;
