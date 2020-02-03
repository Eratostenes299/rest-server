const express = require('express');
const app = express();
const Anuncio = require('../models/Anuncio');
const cors = require('cors');


//Este metodo permite a la aplicacion listar todos los anuncios
app.get('/anuncios', (req, res) => {
    Anuncio.find()
        .exec((err, anuncioDB) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                anuncioDB
            });
        });
});

//Este metodo permite al cliente crear un nuevo registro en el documento.
app.post('/anuncios', (req, res) => {
    let body = req.body;
    let anuncio = new Anuncio({
        ImagenAuncio: body.ImagenAuncio,
        DescripcionAnuncio: body.descripcionAnuncio,
        FechaInicio: new Date(),
        FechaFin: new Date(),
        isActive: true,
        tienda: body.tienda,
        categoria: body.categoria
    });

    anuncio.save((err, anuncioDB) => {
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.status(200).json({
            ok: true,
            anuncioDB
        });
    });
});

//Este metodo perimte al cliente actualizar los datos de un registro en la base de datos.
app.put('/anuncios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'put funcionando correctamente.'
    });
});

//Este metodo permite remover aparentemente de la base de datos los datos del usuario.
app.delete('/anuncios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'delete funciona correctamente'
    });
});

module.exports = app;