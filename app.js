//Instanciamos express
const express = require('express');
const path = require('path');

const app = express();

//Utilizamos motor de plantillas ejs para luego poder poder utilizar HTML
app.set('view engine', 'ejs');

// Configurar el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


//Para poder utilizar el CRUD utilizamos estos 2 middlewares
//Ayudan a procesar los datos en las solicitudes entrantes en una aplicación web.
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Nos permite configurar las rutas desde el router.js directamente
app.use('/', require('./router'));


//Configuramos el servidor
app.listen(5000, () => {
    console.log("Servidor funcionando en puerto 5000");
})