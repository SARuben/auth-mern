// external imports
const mongoose = require("mongoose");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

async function dbConnect() {
  //mongodb+srv://<username>:<password>@myatlasclusteredu.zjbfeks.mongodb.net/test

  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(
        process.env.DB_URL,
      {
        // these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Conectado a MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Se produjo un error en la conexion MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
