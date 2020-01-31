const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioOwnerSchema = new Schema({
    cedula: {
        type: String,
        unique: true,
    },
    nombrePropietario: {
        type: String,
        require: [true, 'El nombre del propietario es un datos requerido.']
    },
    apellidoPropietario: {
        type: String,
        require: [true, 'El apellido del propietario es un campo requerido.']
    },
    fotoPropietario: {
        type: String,
        default: 'user.png'
    },
    correoPropietario: {
        type: String,
        unique: true,
        require: [true, 'El correo electronico es requerido']
    },
    passWord: {
        type: String,
        require: [true, 'El password es un campo requerido.']
    }
});

module.exports = mongoose.model('Propietario', usuarioOwnerSchema);