const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tiendaSchema = new Schema({
    ruc: {
        type: String,
        unique: true,
        require: [true, 'El RUC es un campo requerido para el registro.']
    },
    nombreTienda: {
        type: String,
        require: [true, 'El nombre de la tienda es requerido para el registro.']
    },
    direccionTienda: {
        type: String
    },
    localizacionTienda: {
        type: [Number, Number]
    },
    valoracionTienda: {
        type: Number,
        default: 0
    },
    isActivo: {
        type: Boolean,
        require: [true, 'Este campo es necesario para la tienda.'],
        default: false
    }

});

module.exports = mongoose.model('Tienda', tiendaSchema);