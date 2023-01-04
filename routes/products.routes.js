const express = require("express");
const {
  getProducts,
  postProduct,
  putProduct,
  getProduct,
} = require("../controllers/products.controller");

const productsRouter = express.Router();

productsRouter.put("/:id", putProduct);

productsRouter.get("/:id", getProduct);

productsRouter.get("/", getProducts);

productsRouter.post("/", postProduct);

module.exports = { productsRouter };
