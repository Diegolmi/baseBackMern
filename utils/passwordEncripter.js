const bcryptjs = require('bcryptjs');
require('dotenv').config();


const encriptPassword = async (password) => { // este password es el que el usuario ingresa en el formulario
    const salt = await bcryptjs.genSalt(10); // generando el salt   
    const hash = await bcryptjs.hash(password, salt); // este hash es el que se guarda en la base de datos
    return hash;
}

const comparePassword =  (password, hash) => { // este password es el que el usuario ingresa en el formulario y el hash es el que esta en la base de datos
    const result =  bcryptjs.compareSync(password, hash);
    return result;
}

module.exports = {encriptPassword, comparePassword}