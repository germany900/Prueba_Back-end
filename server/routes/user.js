const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const GenFunctions = require('../services/genToken');
const User = require('../model/user_model');


//Metodo para registrar un usuario
app.post('/register', async (req, res) => {
    let body = req.body;
    let salt = await bcrypt.genSalt(12);
    let hashPassword = await bcrypt.hash(body.password, salt);
    const user = new User ({
        nombre: body.nombre,
        apellidos: body.apellidos,
        username: body.username,
        email: body.email,
        password: hashPassword
    });
    user.save((err, userDB) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.json({
            user: userDB
        })
    })  
});

//Metodo para hacer login y conseguir su token y refreshToken
app.post('/login', async (req, res) => {
    let body = req.body;
    let SearchEmail = await User.findOne({ 
        $or: [{ email: body.pIdentifier }, { username: body.pIdentifier }] }, 
        async (err, userDB) => {
      if(err) {
          return res.status(500).json({
              err
          });
      }
      if(!userDB) {
          return res.status(400).json({
              err: {
                  message: 'Usuario o contraseña incorrectos'
              }
          });
      }
      let token = await GenFunctions.genToken({id: userDB._id, nombre: userDB.nombre});
      let refreshToken = await GenFunctions.genRefreshToken({id: userDB._id, nombre: userDB.nombre});
      if(!bcrypt.compareSync(body.password, userDB.password)) {
        return res.status(400).json({
            err: {
                message: 'Usuario o contraseña son incorrectas'
            }
        });
      }
      res.json({
          user: userDB,
          token,
          refreshToken
      })
    });

});

module.exports = app;