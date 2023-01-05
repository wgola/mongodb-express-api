const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      dropUps: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inOrderProcessing: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

const products = model("Products", productSchema, "products");

module.exports = { products };
