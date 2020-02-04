const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require('./config/config');


//connection to the database
mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, resp) => {
        if (err) throw err;
        console.log('Base de datos online');
    });
//trabajo del body parser 
app.use(cors());
//trabaja con formato x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Trabaja con formato json
app.use(bodyParser.json());

//Configuracion global de servicios
app.use(require('./routes/index'));

//Prueba de googleAuth
app.use(express.static(path.resolve(__dirname, '../public')));
//console.log(path.resolve(__dirname, '../public'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto:`, process.env.PORT);
});