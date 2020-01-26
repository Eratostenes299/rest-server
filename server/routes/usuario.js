const express = require('express');
const Usuario = require('../models/usuario');
const app = express();


app.get('/usuario', (req, res) => {
    res.json('Hola mundo desde express');
});

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
//Recibir informacion desde el cliente
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json('Delete');
});

module.exports = app;