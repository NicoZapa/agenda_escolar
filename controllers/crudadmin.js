const conexion = require('../database/db');

//Crear Materia
exports.save = (req, res) => {
    const nombremateria = req.body.nombremateria;
    const anio = req.body.anio;
    const division = req.body.division;
    const docente = req.body.docente;

    conexion.query('INSERT INTO materias (nombre_materia, division, anio_cursada, profesor_id) VALUES (?, ?, ?, ?);', [nombremateria, division, anio, docente], (error, results) => {
        if(error){
            throw error;
        }else{
            alert('MATERIA AGREGADA EXITOSAMENTE!!');
            res.redirect('/administrador');
        }
    })
}