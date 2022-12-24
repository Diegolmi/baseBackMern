const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductosSchema = new Schema(
  {
    nombre: String,
    precio: Number,
    descripcion: String,
    imagen: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Productos", ProductosSchema);

