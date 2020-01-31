const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let anuncioSchema = new Schema({
    ImagenAnuncio: {
        type: String,
        require: [true, 'La imagen del anuncio es requerida.']
    },
    DescripcionAnuncio: {
        type: String,
        require: [true, 'La descripcion del anuncio es requerida.']
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
    tienda: {
        type: Schema.ObjectId,
        ref: 'Tienda'
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'CategoriaAnuncio'
    }
});

module.exports = mongoose.model('Anuncio', anuncioSchema);