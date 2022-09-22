import React from "react";
import { useState } from "react";
import { getIngredient, getModel, getProcede } from "../api/index";
import { Box, TextField, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  console.log(params);

  switch (params?.type) {
    case "ingredient": {
      setProduct(getIngredient(params?.name));
      break;
    }
    case "model": {
      setProduct(getModel(params?.name));
      break;
    }
    case "procede": {
      setProduct(getProcede(params?.name));
      break;
    }
  }

  return <Box></Box>;
};

export default ProductPage;
