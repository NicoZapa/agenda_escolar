const express = require('express');
const router = express();
const conexion = require('./database/db');
const path = require ('path');


//** LOGIN
router.get('/', (req, res) => {
    res.render('login.ejs');
})

//** DOCENTE
//INICIO
router.get('/docente', (req, res) => {
    res.render('index-docente.ejs');
})

//CURSOS DOCENTE
router.get('/cursos-docente', (req, res) => {
    conexion.query('SELECT * FROM materias', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('cursos-docente.ejs', {results: results});
        }
    })
})


//VER NOTAS DEL CURSO
router.get('/notas-cursos-docente/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('SELECT a.id, a.apellido, a.nombre, n.nota  FROM alumnos a  INNER JOIN materias m ON m.idmateria = a.materia  INNER JOIN notas n ON a.id = n.id_alumno WHERE m.idmateria = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            //console.log(results);
            res.render('notas-cursos-docente.ejs', {alumnos: results});
        }
    })
})

//EDITAR NOTA
router.get('/editar-nota/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('SELECT a.id, a.apellido, a.nombre, n.nota, m.idmateria AS id_materia ,m.nombre AS nombre_materia  FROM alumnos a  INNER JOIN materias m ON m.idmateria = a.materia  INNER JOIN notas n ON a.id = n.id_alumno WHERE a.id = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            console.log(results);
            res.render('editar-nota-docente.ejs', {alumno: results[0]})
        }
    })
})

// INVOCAMOS EL CRUD
const crud = require('./controllers/crud'); // => Importa el controlador de CRUD
router.post('/update', crud.update); // => Llama a la función del controlador

//ELIMINAR NOTA
/*
çrouter.get('/delete/:id', (req, res) => {
    
    const id = req.params.id;

    conexion.query('DELETE FROM alumnos WHERE id = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/cursos-docente');
        }
    })
})
*/

//EXPORTAMOS EL ROUTER PARA QUE LO USE EL app.js
module.exports = router;