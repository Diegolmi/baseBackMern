// definimos los endpoints de los productos

const express = require("express");
const api = express.Router();

const { addProducto, getProductos } = require("../controllers/productController");
const upload = require("../librerias/storage");

api.post("/producto", upload.single('imagen'), addProducto);
api.get("/productos", getProductos);

module.exports = api;