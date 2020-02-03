const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario');

app.use(fileUpload({ useTempFiles: true }));

app.put('/uploads/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo.'
            }
        });
    }
    //Validacion de areas y tipos de archivos subidos
    let tiposAreas = ['anuncios', 'propietarios', 'tiendas', 'usuarios'];
    if (tiposAreas.indexOf(tipo) < 0) {
        res.status(400).json({
            ok: false,
            message: 'El tipo no es valido'
        });
    }

    let archivoDestino = req.files.archivo; //Nombre que se coloca un input en la peticion
    //Extensiones validas formatos de imagenes
    let extensionesValidas = ['jpg', 'png', 'gif', 'jpeg'];
    let nombreArchivo = archivoDestino.name.split('.');
    let extension = nombreArchivo[nombreArchivo.length - 1];
    console.log(extension);

    if (extensionesValidas.indexOf(extension) < 0) {
        res.status(400).json({
            ok: false,
            message: 'La extension no es valida, las extensiones validas son: ' + extensionesValidas.join(' , ')
        });

    }
    //Manejar el archivo del imagen
    let nombreGuardar = `${id}-${new Date().getMilliseconds()}.${extension}`;

    archivoDestino.mv(`../uploads/${tipo}/${nombreGuardar}`, (err) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        //En este punto este usuario ya tiene guardada la imagen

        imgUsuario(id, res, nombreGuardar);
    });
});

function imgUsuario(id, res, nombreGuardar) {
    Usuario.findById(id, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!userDB) {
            res.status(400).json({
                ok: false,
                message: 'usuario no existe!'
            });
        }

        userDB.img = nombreGuardar;
        userDB.save((err, userDB2) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                usuario: userDB2,
                img: nombreGuardar
            });
        });


    })

}
module.exports = app;