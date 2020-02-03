const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let validUser = {
    values: ['USER_ROL', 'ADMIN_ROL'],
    message: '{VALUE} no es el correcto.'
}
let usuarioSchema = new Schema({
    correo: {
        type: String,
        unique: true,
        require: [true, 'El correo es requerido']
    },
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        require: [true, 'El apellido es requerido.']
    },
    password: {
        type: String,
        require: [true, 'La clave es requerido.']
    },
    genero: {
        type: String,
        default: 'OTROS'
    },
    foto: {
        type: String,
        require: false
    },
    google: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROL',
        enum: validUser
    }

});

usuarioSchema.plugin(uniqueValidator, { message: ' {PATH} debe de ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);