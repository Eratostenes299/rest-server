const express = require('express');
const Usuario = require('../models/usuario');
const _ = require('underscore');
const app = express();

//Permite obtener los usuarios desde la base de datos.
app.get('/usuario', (req, res) => {

    //recibir informacion de los usuarios
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);


    Usuario.find({}, 'nombre correo')
        .exec((err, usersDB) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });

            res.status(200).json({
                ok: true,
                usersDB
            });

        });
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
    let body = _.pick(req.body, ['nombre', 'apellido', 'password', 'genero']); //Parametros

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
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

//Este metodo permite remover (aparentemente ) de la base de datos un usuario.
app.delete('/usuario', (req, res) => {
    res.json('Delete');
});

module.exports = app;