//=============================================================
//Trabajando con puertos
//=============================================================
process.env.PORT = process.env.PORT || 3000;
//=============================================================
//Entorno 
//=============================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============================================================
//Base de datos
//=============================================================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/ofertondb';
} else {

    urlDB = 'mongodb+srv://Lara1994:299X792y458z@ofertoncluster-2g99z.mongodb.net/test?retryWrites=true&w=majority';
}

process.env.urlDB = urlDB;