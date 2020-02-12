const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario');
const Tienda = require('../models/Tienda');
const Anuncio = require('../models/Anuncio');
const Propietario = require('../models/UsuarioOwner');
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

        switch (tipo) {
            case 'anuncios':
                {
                    imgAnuncios(id, res, nombreGuardar);
                    break;
                }
            case 'usuarios':
                {
                    imgUsuario(id, res, nombreGuardar);
                    break;
                }
            case 'tiendas':
                {
                    imgTiendas(id, res, nombreGuardar);
                    break;
                }
            case 'propietarios':
                {
                    imgPropietarios(id, res, nombreGuardar);
                    break;
                }
            default:
                {
                    res.status(400).json({
                        ok: false,
                        message: "El tipo se encuentra mal definido."
                    });
                    break;
                }
        }



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
        console.log(userDB);
        console.log(id);

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

///Funcion de trabajo con las imagenes de los anuncios
function imgAnuncios(id, res, nombreGuardar) {
    Anuncio.findById(id, (err, anuncioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        console.log(id);
        if (!anuncioDB) {
            res.status(400).json({
                ok: false,
                message: 'anuncio no existe!'
            });
        }

        anuncioDB.img = nombreGuardar;
        anuncioDB.save((err, anuncioDB2) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                anuncio: anuncioDB2,
                img: nombreGuardar
            });
        });


    })

}

//Funcion que trabaja para guardar las imagenes de los propietarios
function imgPropietarios(id, res, nombreGuardar) {
    Propietario.findById(id, (err, propietarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!propietarioDB) {
            res.status(400).json({
                ok: false,
                message: 'anuncio no existe!'
            });
        }

        propietarioDB.img = nombreGuardar;
        propietario.save((err, propietarioDB2) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                usuario: propietarioDB2,
                img: nombreGuardar
            });
        });


    })

}
//Funcio que traba para guardar las imagenes de las tiendas
function imgTiendas(id, res, nombreGuardar) {
    Tienda.findById(id, (err, tiendaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!tiendaDB) {
            res.status(400).json({
                ok: false,
                message: 'anuncio no existe!'
            });
        }

        tiendaDB.imgTienda = nombreGuardar;
        tiendaDB.save((err, tiendaDB2) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                usuario: tiendaDB2,
                img: nombreGuardar
            });
        });


    })

}


module.exports = app;