const express = require('express');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');
//Me permite llamar a mis rutas

//Permite llamar a la ruta de tiendas de la base de datos.
app.use(require('./tiendas'));
// Permite llamar la ruta de los anuncios de la base de datos.
app.use(require('./anuncios'));
//Permite llamar a la ruta de los comentarios de la base de datos.
app.use(require('./comentarios'));
//Permite llamar a la ruta de los cupones de la base de datos.
app.use(require('./cupones'));
//Permite llamar a la ruta de las categorias de anuncios de la base de datos.
app.use(require('./categoriaAnuncio'));
//Ruta propietarios
app.use(require('./propietario'));
//Ruta para los archivos imagenes
app.use(require('./uploads'));
//Ruta del login
app.use(require('./login'));
//
app.use(require('./testUser'));
//Imagens
app.use(require('./imagenes'));
module.exports = app;