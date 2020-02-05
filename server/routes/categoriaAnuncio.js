const express = require('express');
const app = express();
const categoriaAnuncio = require('../models/CategoriaAnuncio');

//Este metodo permite a la aplicacion listar todos los anuncios
app.get('/categoriaAnuncios', (req, res) => {
    categoriaAnuncio.find({})
        .exec((err, categorias) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                categorias
            });
        });
});

//Este metodo permite al cliente crear un nuevo registro en el documento.
app.post('/categoriaAnuncios', (req, res) => {
    let body = req.body;
    let nuevaCategoria = new categoriaAnuncio({
        NombreCategoria: body.NombreCategoria
    });
    nuevaCategoria.save((err, categoria) => {
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        res.status(200).json({
            ok: true,
            categoria
        });
    });
});

//Este metodo perimte al cliente actualizar los datos de un registro en la base de datos.
app.put('/categoriaAnuncios/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    categoriaAnuncio.findByIdAndUpdate(id, body, { new: true }, (err, update) => {
        if (err) return res.status(400).json({
            ok: false,
            message: 'Problems updating your data, maybe the id does not have coinsidences',
            err
        });
        res.status(400).json({
            ok: true,
            message: 'Your update was succesful!',
            update
        });
    });
});

//Este metodo permite remover aparentemente de la base de datos los datos del usuario.
app.delete('/categoriaAnuncios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'delete funciona correctamente'
    });
});

module.exports = app;