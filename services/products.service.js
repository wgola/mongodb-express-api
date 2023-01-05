const { products } = require("../models/product.model");

const getAllProducts = async (sort_by, order, filter) =>
  await products.find(filter).sort({ [sort_by]: order === "desc" ? -1 : 1 });

const getProductById = async (id) => await products.findById(id);

const addProduct = async (name, price, description, amount, unit) => {
  try {
    const doc = {
      name: name,
      price: price,
      description: description,
      amount: amount,
      unit: unit,
      inOrderProcessing: false,
    };
    await products.create(doc);
    return true;
  } catch (e) {
    return false;
  }
};

const editProduct = async (id, name, price, description, amount, unit) => {
  try {
    const updated = {};
    if (name) updated["name"] = name;
    if (price) updated["price"] = price;
    if (description) updated["description"] = description;
    if (amount) updated["amount"] = amount;
    if (unit) updated["unit"] = unit;
    const result = await products.updateOne({ _id: id }, updated);
    return result.acknowledged && result.modifiedCount === 1;
  } catch (e) {
    return false;
  }
};

const deleteProductById = async (id) => {
  try {
    const result = await products.deleteOne({
      _id: id,
      inOrderProcessing: false,
    });
    return result.deletedCount === 1;
  } catch (e) {
    return false;
  }
};

const createRaport = async () => {
  try {
    const result = await products.aggregate([
      {
        $project: {
          name: 1,
          amount: { $concat: [{ $toString: "$amount" }, " ", "$unit"] },
          price: 1,
          totalPrice: { $multiply: ["$amount", "$price"] },
        },
      },
    ]);
    return result;
  } catch (e) {
    return [];
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProductById,
  createRaport,
};
