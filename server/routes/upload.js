const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './upload');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now() / 1000}.jpg`)
    },
})
const upload = multer({ storage: Storage });
const { verifyToken } = require('../utils/authentication');
const app = express();


//Metodo de para subir una imagen con un token para verificar
app.post('/uploadimg', [verifyToken, upload.single('perfil')], async (req, res) => {
    console.log(req.file);
    let data = req.file;
    let path_file = './upload/' + data.filename;

    fs.exists(path_file, (exists) => {
        if(exists) {
            res.status(200).json({
                message: 'Se guardo la imagen',
                saveImg: path.resolve(path_file)
            })
        }
    })
});

//Metodo para obtener una imagen por el nombre con un token para verificar..
app.get('/img/:img_name', verifyToken, async(req, res) => {
    let img_name = req.body.img_name;
    let path_file = './upload/' + img_name;

    fs.exists(path_file, (exists) => {
        if(exists) return res.sendFile(path.resolve(path_file));
        res.status(200).send({ message: 'No se encontro la imagen!!' })
    });
})



module.exports = app;