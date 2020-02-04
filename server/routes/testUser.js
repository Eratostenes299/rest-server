const express = require('express');
const Usuario = require('../models/usuario');
const _ = require('underscore');
const app = express();
const { verficaToken } = require('../middlewares/autenticacion');

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        correo: body.correo,
        nombre: body.nombre,
        apellido: body.apellido,
        password: body.password,
        genero: body.genero,
        rol: body.rol

    });


    //Grabar en una base de datos
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
module.exports = app;