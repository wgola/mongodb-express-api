const { getAllProducts } = require("../services/products.service");
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

module.exports = { getProducts };
