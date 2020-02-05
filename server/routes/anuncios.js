const express = require('express');
const app = express();
const Anuncio = require('../models/Anuncio');
const Tienda = require('../models/Tienda');
const CategoriaAnuncio = require('../models/CategoriaAnuncio');
const cupones = require('../models/Cupon');
//Este metodo permite a la aplicacion listar todos los anuncios
app.get('/anuncios', (req, res) => {
    Anuncio.find()
        .exec((err, anuncioDB) => {

            Tienda.populate(anuncioDB, { path: 'tienda' }, (err, anuncioDB) => {

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
});

//Este metodo permite al cliente crear un nuevo registro en el documento.
app.post('/anuncios', (req, res) => {
    let body = req.body;
    let anuncio = new Anuncio({
        TituloAnuncio: body.TituloAnuncio,
        ImagenAuncio: body.ImagenAuncio,
        DescripcionAnuncio: body.DescripcionAnuncio,
        FechaInicio: new Date(),
        FechaFin: body.FechaFin,
        isActive: true,
        DescuentoProducto: body.DescuentoProducto,
        PrecioProducto: body.PrecioProducto,
        CantidadCupones: body.CantidadCupones,
        Tienda: body.Tienda,
        Categoria: body.Categoria
    });

    anuncio.save((err, anuncioDB) => {
        if (err) return res.status(400).json({
            ok: false,
            err
        });
        GenerarCupones(Number(body.CantidadCupones), anuncioDB.id);
        res.status(200).json({
            ok: true,
            anuncioDB
        });

    });
});

app.post('/anuncios/consulta/:id', (req, res) => {
    let body = req.params.id;
    let consulta = body.split("=");
    Anuncio.findById(consulta[1])
        .exec((err, anuncioDB) => {


            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: false,
                anuncioDB
            });

        });

});
//FuncionExterna que permite crear cupones en base al anuncio
function GenerarCupones(numeroCupones, idAnuncio) {
    for (let i = 0; i < numeroCupones; i++) {
        let cupon = new cupones({
            NumeracionCupon: getNumeroCupon(),
            anuncio: idAnuncio
        });
        cupon.save((err) => {
            if (err) return false;
        });
    }

}

function getNumeroCupon() {
    let indice = Math.random();
    let valorRandom = Math.round(indice * (999999 - 99999) + 29999999);
    return valorRandom;
}
//Este metodo perimte al cliente actualizar los datos de un registro en la base de datos.
app.put('/anuncios/:id', (req, res) => {

});

//Este metodo permite remover aparentemente de la base de datos los datos del usuario.
app.delete('/anuncios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'delete funciona correctamente'
    });
});

module.exports = app;