const express = require('express');
const fs = require('fs');
let app = express();
const path = require('path');

app.get('/imagen/:tipo/:img', (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    console.log(img);
    let slash = "\\";
    let pathImagen = `../uploads/${tipo}/${img}`;
    //../../uploads/${tipo}/${img}
    console.log(pathImagen);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {

        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
});


module.exports = app;