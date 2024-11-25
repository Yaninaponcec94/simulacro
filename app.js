const express = require('express');
const path = require('path');
const logger = require('morgan');
var app = express();
const sequelize = require('./db/sequelize');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const createError = require('http-errors');

// Cargar las variables de entorno desde el archivo .env
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "public/image")));


//relaciones:
const Tren = require("./models/tren.entity");
const Estacion = require("./models/estacion.entity");
const Relaciones= require("./models/relacion.entity");

Tren.belongsToMany(Estacion, {through: Relaciones});
Estacion.belongsToMany(Tren, {through: Relaciones});

//cargo las rutas:
const indexRouter= require("./router/index");
const trenesRouter= require("./router/trenes");
const estacionesRouter= require("./router/estaciones");
const relacionesRouter= require("./router/relaciones");

// Cargar las rutas:
app.use("/", indexRouter);
app.use("/trenes", trenesRouter);
app.use("/estaciones", estacionesRouter);  
app.use("/relaciones", relacionesRouter);

// error 404 (colocarlo después de las rutas)
app.use(function(req, res, next){
    next(createError(404));
});

// Manejo de errores
app.use((err, req, res, next) => {
    // Establece locals, solo proporcionando errores en desarrollo
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renderiza la página de error
    res.status(err.status || 500);
    res.render('error');
});


// Usar las variables de entorno
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});



module.exports = app;