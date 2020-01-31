const express = require('express');
const app = express();
const Cupon = require('../models/Cupon');
const Anuncio = require('../models/Anuncio');


//Envia todas las tiendas que se encuentran en la base de datos
app.get('/cupones', (req, res) => {
    Cupon.find()
        .exec((err, cupones) => {

            Anuncio.populate(cupones, { path: 'anuncio' }, (err, cupones) => {
                if (err) return res.status(400).json({
                    err
                });
                res.status(200).json({
                    cupones
                });
            });
        });
});

//Recibe desde el metodo POST datos desde el cliente, permite crear un registro en la base.
app.post('/cupones', (req, res) => {

    let body = req.body;
    let cupon = new Cupon({
        NumeracionCupon: String(getNumeroCupon()),
        isDisponible: body.isDisponible,
        anuncio: body.anuncio
    });

    cupon.save((err, cuponDB) => {
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.status(400).json({
            ok: true,
            cuponDB
        });
    });
});

//Funcion temporal de prueba para generar codigos de cupones aleatorios
function getNumeroCupon() {
    let indice = Math.random();
    let valorRandom = Math.round(indice * (200000 - 400000) + 200000);
    return valorRandom;
}
//Este metodo permite trabajar con el metodo PUT, para actualizar tiendas en base al ruc.
app.put('/cupones', (req, res) => {
    res.json({
        ok: true,
        message: 'put correctamente funcionando'
    });
});

//Este metodo permite remover un documento de la base de datos (aparentemente).
app.delete('/cupones', (req, res) => {
    res.json({
        ok: true,
        message: 'delete correctamente funcionando'
    });
});


module.exports = app;