const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let categoriaAnuncioSchema = new Schema({
    NombreCategoria: {
        type: String,
        unique: true,
        require: [true, 'No pueden existir categorias vacias.']
    }
});