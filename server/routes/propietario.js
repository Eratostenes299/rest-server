const express = require('express');
const app = express();
const Propietario = require('../models/UsuarioOwner');
//Consulta de propietarios
app.get('/propietario', (req, res) => {
    Propietario.find()
    exec((err, propietarios) => {

    });
});

//Este metodo permite crear propietarios
app.post('/propietario', (req, res) => {
    let body = req.body;
    let propietario = new Propietario({
        cedula: body.cedula,
        nombrePropietario: body.nombrePropietario,
        apellidoPropietario: body.apellidoPropietario,
        fotoPropietario: body.fotoPropietario,
        correoPropietario: body.fotoPropietario,
        passWord: body.passWord
    });

    propietario.save((err, propietarioDB) => {
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.status(400).json({
            ok: true,
            propietarioDB
        });

    });

});

//Este metodo permite actualizar la informacion de los propietarios
app.put('/propietario', (req, res) => {

});

//Este metodo permite al usuario darse de baja del servicio
app.delete('/propietario', (req, res) => {

});

module.exports = app;