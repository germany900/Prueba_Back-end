'use strict';
const mongoose = require('mongoose');
const express = require('express');
const index = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


//cargar middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//cargar Rutas
app.use('/api', index);

// habilitar public
app.use(express.static(path.resolve(__dirname, "./public")));

mongoose.connect('mongodb://localhost:27017/nuevoback', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("Base de datos running");
})
.catch(err => console.log(err));


app.listen(4000, () => {
    console.log('servidor corriendo en el puerto 4000');
})