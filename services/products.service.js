const { database } = require("../db/dbConfig");

const getAllProducts = async (sort_by, order, filter) =>
  await database
    .getCollection()
    .find(filter)
    .sort({ [sort_by]: order === "desc" ? -1 : 1 })
    .toArray();

const getProductById = async (id) =>
  await database.getCollection().findOne({ _id: id });

const checkIfExistsByName = async (name) =>
  (await database.getCollection().findOne({ name: name })) !== null;

const addProduct = async (name, price, description, amount, unit) => {
  try {
    const ifUnique = !(await checkIfExistsByName(name));
    if (ifUnique) {
      const doc = {
        name: name,
        price: price,
        description: description,
        amount: amount,
        unit: unit,
        inOrderProcessing: false,
      };
      await database.getCollection().insertOne(doc);
      return true;
    }
    return false;
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
    const result = await database
      .getCollection()
      .updateOne({ _id: id }, { $set: updated });
    return result.acknowledged;
  } catch (e) {
    return false;
  }
};

module.exports = { getAllProducts, addProduct };
