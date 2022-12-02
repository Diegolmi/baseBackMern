const mongoose = require("mongoose");
const User = require("../models/userSchema");
const {
  encriptPassword,
  comparePassword,
} = require("../utils/passwordEncripter");

const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({
        statusCode: 404,
        message: "Usuario no encontrando",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Usuarios encontrados",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al buscar usuarios",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.inValidObjectId(id)) {
      res.status(400).json({
        statusCode: 400,
        message: "Id invalido",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Usuario encontrado",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al buscar usuario",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body; // tomando los datos que el usuario ingresa en el formulario
  //   const user = await User({ name, lastname, email, password }); // creando un nuevo usuario con los datos que el usuario ingreso
  const secret = process.env.SECRET_KEY;
  const token = jwt.sign({ email: email }, secret, { expiresIn: "1h" });
  try {
    if (user) {
      res.status(400).json({
        statusCode: 400,
        message: "Usuario ya existe",
      });
    }
    const newUser = new User({
      ...req.body,
      name,
      lastname,
      email,
      password: encriptPassword(password),
      confirmacionToken: token, // token para confirmar el email
    });

    const user = await newUser.save();
    res.status(201).json({
      statusCode: 201,
      message: "Usuario creado",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al crear usuario",
      error: error.message,
    });
  }
};

// FALTA LA VERIFICACION DEL EMAIL

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }
    const verificacionPass = comparePassword(password, user.password); // retorna un booleano

    if (!verificacionPass) {
      res.status(401).json({
        statusCode: 401,
        message: "Contraseña incorrecta",
      });
    }
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign({ email: email }, secret, { expiresIn: "1h" });
    res.status(200).json({
      statusCode: 200,
      message: "Usuario logeado",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al logear usuario",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      statusCode: 200,
      message: "Usuario deslogeado",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al deslogear usuario",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.inValidObjectId(id)) {
      res.status(400).json({
        statusCode: 400,
        message: "Id invalido",
      });
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Usuario actualizado",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.inValidObjectId(id)) {
      res.status(400).json({
        statusCode: 400,
        message: "Id invalido",
      });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
};

module.exports = {
  getAllusers,
  getUser,
  registerUser,
  loginUser,
  logout,
  updateUser,
  deleteUser,
};
