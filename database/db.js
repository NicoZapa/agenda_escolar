const mysql = require('mysql');

//Establecemos la conexion con la Base de Datos
const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Password1234',
    database:'agenda_escolar',
})

//Verificamos la conexion
conexion.connect((error) => {
    if(error){
        console.error('El error de conexion es: '+ error);
        return;
    }
    console.log('Conectado a la BD MySQL!');
})

//Exportamos 'conexion'
module.exports = conexion;