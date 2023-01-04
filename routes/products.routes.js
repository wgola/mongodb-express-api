const express = require("express");
const {
  getProducts,
  postProduct,
  putProduct,
} = require("../controllers/products.controller");

const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.post("/", postProduct);

productsRouter.put("/:id", putProduct);

module.exports = { productsRouter };
