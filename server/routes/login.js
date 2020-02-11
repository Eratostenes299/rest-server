const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ correo: body.correo }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            });

        }
        //En caso de que el usuairo no exista
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o clave incorrectos.'
                }
            });
        }
        //Evaluacion de la clave de acceso
        if (body.password !== userDB.password) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o clave incorrectos.'
                }
            });

        }
        let token = jwt.sign({
            usuario: userDB,

        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({
            ok: true,
            usuario: userDB,
            token
        });
    });
});


module.exports = app;