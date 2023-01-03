const { database } = require("../db/dbConfig");

const getAllProducts = async (sort_by, order, filter) =>
  await database
    .getCollection()
    .find(filter)
    .sort({ [sort_by]: order === "desc" ? -1 : 1 })
    .toArray();

// const addProduct = async();

module.exports = { getAllProducts };
