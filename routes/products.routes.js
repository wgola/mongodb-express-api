const express = require("express");
const {
  getProducts,
  postProduct,
  putProduct,
  getProduct,
  deleteProduct,
  getRaport,
} = require("../controllers/products.controller");

const productsRouter = express.Router();

productsRouter.get("/raport", getRaport);

productsRouter.put("/:id", putProduct);

productsRouter.get("/:id", getProduct);

productsRouter.delete("/:id", deleteProduct);

productsRouter.get("/", getProducts);

productsRouter.post("/", postProduct);

module.exports = { productsRouter };
