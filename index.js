const express = require("express");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
