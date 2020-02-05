const express = require('express');
const app = express();
const Propietario = require('../models/UsuarioOwner');
//Consulta de propietarios
app.get('/propietario', (req, res) => {
    Propietario.find()
        .exec((err, propietarios) => {

        });
});
app.post('/propietario/login', (req, res) => {

    let body = req.body;

    UsuarioOwner.findOne({ correoProietario: body.correo }, (err, userDB) => {
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