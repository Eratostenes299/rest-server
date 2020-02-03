const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('./config/config');


//connection to the database
mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, resp) => {
        if (err) throw err;
        console.log('Base de datos online');
    });
//trabajo del body parser 

//trabaja con formato x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Trabaja con formato json
app.use(bodyParser.json());

//Me permite llamar a mis rutas
//app.use(require('./routes/usuario'));
//Permite llamar a la ruta de tiendas de la base de datos.
app.use(require('./routes/tiendas'));
// Permite llamar la ruta de los anuncios de la base de datos.
app.use(require('./routes/anuncios'));
//Permite llamar a la ruta de los comentarios de la base de datos.
app.use(require('./routes/comentarios'));
//Permite llamar a la ruta de los cupones de la base de datos.
app.use(require('./routes/cupones'));
//Permite llamar a la ruta de las categorias de anuncios de la base de datos.
app.use(require('./routes/categoriaAnuncio'));
//Ruta propietarios
app.use(require('./routes/propietario'));
//Ruta para los archivos imagenes
app.use(require('./routes/uploads'));

//Prueba de googleAuth
//app.use(express.static(path.resolve(__dirname, '../public')));
//console.log(path.resolve(__dirname, '../public'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto:`, process.env.PORT);
});