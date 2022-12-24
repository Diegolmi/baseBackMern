// definimos los endpoints de los productos

const express = require("express");
const api = express.Router();

const { addProducto, getProductos } = require("../controllers/productController");

api.post("/producto", addProducto);
api.get("/productos", getProductos);

module.exports = api;