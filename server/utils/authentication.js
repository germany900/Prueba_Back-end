let jwt = require('jsonwebtoken');
require("dotenv").config();

let verifyToken = async(req, res, next) => {
    let token = req.header('Authorization');
    let VToken = token.split(' ')[1];
    //Separa El Bearer del token que esta en el header...
    jwt.verify(VToken, process.env.SECRET_KEY_JWT_AT, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                    auth: false,
                    err: {
                        message: 'Token no valido!!'
                    }
            });
        }
        req.nombre = decoded.nombre;
        next();
    });
  
};

module.exports = {
    verifyToken
}