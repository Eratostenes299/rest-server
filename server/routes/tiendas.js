const express = require('express');
const app = express();
const _ = require('underscore');
const Tienda = require('../models/Tienda');

//Envia todas las tiendas que se encuentran en la base de datos
app.get('/tiendas', (req, res) => {

    Tienda.find({})
        .limit(10)
        .exec((err, usuarios) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                usuarios
            });
        });

});

app.get('/tienda/consulta/:id', (req, res) => {
    let body = req.params.id;
    let consulta = body.split("=");
    Tienda.findById(consulta[1])
        .exec((err, tiendaDB) => {


            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                TiendaDb
            });

        });

});
//Recibe desde el metodo POST datos desde el cliente, permite crear un registro en la base.
app.post('/tiendas', (req, res) => {
    let body = req.body;

    let tienda = new Tienda({
        ruc: body.ruc,
        nombreTienda: body.nombreTienda,
        direccionTienda: body.direccionTienda,
        localizacionTienda: body.localizacionTienda,
        descripcionNegocio: body.descripcionNegocio,
        valoracionTienda: body.valoracionTienda,
        isActivo: true
    });

    tienda.save((err, userDB) => {
        if (err) return res.status(400).json({
            ok: false,
            message: err
        });
        res.status(200).json({
            ok: true,
            message: userDB
        });
    });
});

//Este metodo permite trabajar con el metodo PUT, para actualizar tiendas en base al ruc.
app.put('/tiendas/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['valoracionTienda', 'direccionTienda', 'localizacionTienda', 'descripcionNegocio']); //En este apartado se trabaja con underscore

    //Permite actualizar las tiendas mediante el metodo put
    Tienda.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.status(200).json({
            ok: true,
            userDB
        });
    });
});

//Este metodo permite remover un documento de la base de datos (aparentemente).
app.delete('/tiendas', (req, res) => {
    res.json({
        ok: true,
        message: 'delete correctamente funcionando'
    });
});
module.exports = app;