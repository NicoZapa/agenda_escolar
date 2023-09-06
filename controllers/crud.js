const conexion = require('../database/db');

//Editar Nota
exports.update = (req, res) => {
    const id_alumno = req.body.id;
    const id_materia = req.body.id_materia;
    const nota1 = req.body.nota1;
    const nota2 = req.body.nota2;
    const nota3 = req.body.nota3;

    conexion.query('UPDATE inscripcion_alumnos_materias  SET calificacion_trimestre1 = ?, calificacion_trimestre2 = ?, calificacion_trimestre3 = ? WHERE alumno_id = ? AND materia_id = ?', [nota1, nota2, nota3, id_alumno, id_materia], (error, results) => {
        if(error){
            throw error;
        }else{
            console.log('****** CRUD ******')
            res.redirect(`notas-cursos-docente/${id_materia}`);
        }
    })
}