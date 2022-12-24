const bcryptjs = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const {appConfig, dbConfig} = require("./config");
const connectDb = require("./db/mongodb");
const app = require("./app");
const express = require("express");

dotenv.config();
app.use(cors());
app.use("/public", express.static(`${__dirname}/storage/imagenes`)) // definimos la ruta publica para acceder a las imagenes




const initApp = async (appConfig, dbConfig) => {
  try{ 
    await connectDb(dbConfig);
    app.listen(appConfig.port, () => {
      console.log(`Servidor corriendo en puerto ${appConfig.port}`);
    });
  }catch(error){
    console.log(error);
    process.exit(0) // termina el proceso
  }
}

initApp(appConfig, dbConfig);
