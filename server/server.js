const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config');

//trabajo del body parser 
//trabaja con formato x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Trabaja con formato json
app.use(bodyParser.json());

//Este el primer llamado desde la base de datos
app.get('/usuario', (req, res) => {
    res.json('Hola mundo desde express');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    //Trabajar con codigos
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false
        });
    } else {
        res.json({
            body
        });
    }
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


//Seccion productos
productos = [{
        nombre: "medias"
    },
    {
        nombre: "pantalones"
    }
]

app.get('/productos', function(req, res) {
    res.json(productos);
});
app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto:`, process.env.PORT);
});