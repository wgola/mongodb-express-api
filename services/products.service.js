const { database } = require("../db/dbConfig");

const getAllProducts = async (sort_by, order, filter) =>
  await database
    .getCollection()
    .find(filter)
    .sort({ [sort_by]: order === "desc" ? -1 : 1 })
    .toArray();

const checkIfExistsByName = async (name) =>
  (await database.getCollection().findOne({ name: name })) !== null;

const addProduct = async (name, price, description, amount, unit) => {
  try {
    const ifUnique = await checkIfExistsByName(name);
    if (ifUnique) {
      const doc = {
        name: name,
        price: price,
        description: description,
        amount: amount,
        unit: unit,
      };
      await database.getCollection().insertOne(doc);
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
};

module.exports = { getAllProducts, addProduct };
