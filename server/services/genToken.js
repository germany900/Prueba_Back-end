const jwt = require('jsonwebtoken');
require("dotenv").config();

let onlyRefresh = process.env.DATA_REFRESH_TOKEN;

//Servicios para generar token y refreshToken

const genToken = async (data) => {
    const token = await jwt.sign({
        data
    }, 
        process.env.SECRET_KEY_JWT_AT,
    {
        expiresIn: '10d'
    });
    return token;
};

const genRefreshToken = async (data) => {
    const refreshToken = await jwt.sign({
        data,
        onlyRefresh
    },
        process.env.SECRET_KEY_JWT_AT,
    {
        expiresIn: '10d'
    });
    return refreshToken;
}

module.exports = {
    genToken,
    genRefreshToken
}