const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbConnect");
const cors = require("cors")
const auth = require("./auth");
const { getHome,userRegister,userLogin } = require("./controlers/users.controlers") 

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", getHome );

app.post("/register", userRegister);  
  
app.post('/login',userLogin);


// midlleware de control de origen cruzado
// Curb Cores Error by adding a header here
dbConnect()
module.exports = app;
