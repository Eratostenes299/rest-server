const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cuponSchema = new Schema({
    NumeracionCupon: {
        type: String,
        unique: true,
        required: true
    },
    isDisponible: {
        type: Boolean,
        default: true
    },
    anuncio: {
        type: Schema.ObjectId,
        ref: 'Anuncio'
    }
});

module.exports = mongoose.model('Cupones', cuponSchema);