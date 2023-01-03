const express = require("express");
const {
  getProducts,
  postProduct,
} = require("../controllers/products.controller");

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", postProduct);

module.exports = { productsRouter };
