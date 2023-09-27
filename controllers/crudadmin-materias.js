const conexion = require('../database/db');

//Editar Materia
exports.update = (req, res) => {
    const id_materia = req.body.id_materia;
    const nombremateria = req.body.nombremateria;
    const anio = req.body.anio;
    const division = req.body.division;
    const docente = req.body.docente;

    conexion.query('UPDATE materias SET nombre_materia=?, anio_cursada=?, division=?, profesor_id=? WHERE id_materia = ?', [nombremateria, anio, division, docente, id_materia], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect("/administrador");
        }
    })
}

//Crear Materia
exports.save = (req, res) => {
    const nombremateria = req.body.nombremateria;
    const anio = req.body.anio;
    const division = req.body.division;
    const docente = req.body.docente;
    const estado = 1;

    conexion.query('INSERT INTO materias (nombre_materia, division, anio_cursada, profesor_id, estado) VALUES (?, ?, ?, ?, ?);', [nombremateria, division, anio, docente, estado], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/administrador');
        }
    })
}