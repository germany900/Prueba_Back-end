const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema ({
    nombre: { type: String },
    apellidos: { type: String },
    username: {
        type: String,
        unique: true,
        required: [true, 'El username es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'la password en necesaria']
    }
});

const user = mongoose.model('User', userSchema);

module.exports = user;