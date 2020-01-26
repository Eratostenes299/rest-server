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
    }
    /**
     cupon : {
        {Schema.Types.ObjectId, ref: 'Cupon'}
    }

     CategoriaAnuncio : {
       {Schema.Types.ObjectId, ref: 'CategoriaAnuncio'}  
     }

     Comentario :

     * 
     */
});