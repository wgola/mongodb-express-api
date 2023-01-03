const { getAllProducts, addProduct } = require("../services/products.service");
const { createFilter } = require("../utils/createFilter");

const getProducts = async (req, res) => {
  try {
    const { sort_by, order, ...rest } = req.query;
    const filter = createFilter(rest);
    const products = await getAllProducts(sort_by, order, filter);
    res.status(200).json(products);
  } catch (e) {
    res.status(503).json(e);
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, price, description, amount, unit } = req.body;
    const ifCreated = await addProduct(name, price, description, amount, unit);
    ifCreated ? res.sendStatus(201) : res.sendStatus(500);
  } catch (e) {
    res.status(503).json(e);
  }
};

module.exports = { getProducts, postProduct };
