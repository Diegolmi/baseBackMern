const mongoose = require('mongoose')
const { dbConfig } = require('../config')

mongoose.connection.on('abierto', () => console.log('Conexión a la base de datos establecida'))

const connectDb = async () => {
    const { host, portName, dbName } = dbConfig;
    const uri = `mongodb://${host}:${portName}/${dbName}`;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = connectDb 