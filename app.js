const bodyParser = require("body-parser");
const express = require("express");
const rutaProductos = require("./rutas/producto.rutas")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1", rutaProductos  )

module.exports = app;
