const conexion = require('../database/db');

//Editar Nota
exports.update = (req, res) => {
    const id_alumno = req.body.id;
    const id_materia = req.body.id_materia;
    const nota = req.body.nota;

    conexion.query('UPDATE notas SET nota = ? WHERE id_alumno = ? AND id_materia = ?', [nota, id_alumno, id_materia], (error, results) => {
        if(error){
            throw error;
        }else{
            console.log('****** CRUD ******')
            res.redirect(`notas-cursos-docente/${id_materia}`);
        }
    })
}