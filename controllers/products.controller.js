const {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProductById,
} = require("../services/products.service");
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

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.status(200).json(product);
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

const putProduct = async (req, res) => {
  try {
    const { name, price, description, amount, unit } = req.body;
    const ifEdited = await editProduct(
      req.params.id,
      name,
      price,
      description,
      amount,
      unit
    );
    ifEdited ? res.status(201).json(true) : res.status(500).json(false);
  } catch (e) {
    res.status(503).json(e);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductById(req.params.id);
    result ? res.status(200).json(true) : res.status(500).json(false);
  } catch (e) {
    res.status(503).json(e);
  }
};

module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
};
