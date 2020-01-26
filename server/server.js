const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config');


//connection to the database
mongoose.connect('mongodb://localhost:27017/ofertondb', (err, resp) => {
    if (err) throw err;
    console.log('Base de datos online');
});
//trabajo del body parser 
//trabaja con formato x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Trabaja con formato json
app.use(bodyParser.json());

//Me permite llamar a mis rutas
app.use(require('./routes/usuario'));

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