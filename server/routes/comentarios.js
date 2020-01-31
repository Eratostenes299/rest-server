const express = require('express');
const app = express();

app.get('/comentarios', (req, res) => {
    res.json({
        ok: true,
        message: 'get funcionando correctamente.'
    });
});

//Este metodo permite al cliente crear un nuevo registro en el documento.
app.post('/comentarios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'post funcionando correctamente.'
    });
});

//Este metodo perimte al cliente actualizar los datos de un registro en la base de datos.
app.put('/comentarios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'put funcionando correctamente.'
    });
});

//Este metodo permite remover aparentemente de la base de datos los datos del usuario.
app.delete('/comentarios', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'delete funciona correctamente'
    });
});

module.exports = app;