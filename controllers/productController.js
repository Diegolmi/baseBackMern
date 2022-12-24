const Producto = require("../models/productosSchema");

const addProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen } = req.body;
    const producto = new Producto({
      nombre,
      precio,
      descripcion,
      imagen,
    });

    if(req.file){
        const {filename} = req.file;
        producto.setImgUrl(filename);
    }
    const productoStore = await producto.save();
    res.status(200).send({ productoStore });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al agregar producto",
      error: error.message,
    });
  }
};

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).send({ productos });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

const deleteProducto = async (req, res) => {};

const updateProducto = async (req, res) => {};





module.exports = {
  addProducto,
  getProductos,
  deleteProducto,
  updateProducto
};
