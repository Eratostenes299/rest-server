const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let anuncioSchema = new Schema({
    TituloAnuncio: {
        type: String,
        require: [true, 'El titulo del anuncio es necesario']
    },
    ImagenAnuncio: {
        type: String,
        require: [true, 'La imagen del anuncio es requerida.']
    },
    DescripcionAnuncio: {
        type: String,
        require: [true, 'La descripcion del anuncio es requerida.']
    },
    PrecioProducto: {
        type: Number,
        require: [true, 'El campo del precio es requerido']
    },
    DescuentoProducto: {
        type: Number,
        default: 0
    },
    FechaInicio: {
        type: Date,
        require: true
    },
    FechaFin: {
        type: Date,
        require: true
    },
    isActivo: {
        type: Boolean,
        default: true
    },
    CantidadCupones: {
        type: Number,
        default: 0
    },
    Tienda: {
        type: Schema.ObjectId,
        ref: 'Tienda'
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'CategoriaAnuncio'
    }

});

module.exports = mongoose.model('Anuncio', anuncioSchema);