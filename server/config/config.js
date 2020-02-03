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

    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;
//=============================================================
//Client ID
//=============================================================

process.env.CLIEN_ID = process.env.CLIEN_ID || '262373626774-6n90i7r2uva7c8eonevcm1b4g1oiiarv.apps.googleusercontent.com';