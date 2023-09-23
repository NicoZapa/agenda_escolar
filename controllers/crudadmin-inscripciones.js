const conexion = require('../database/db');

//GUARDAR INSCRIPCION
exports.save = (req, res) => {
    const id_alumno = req.body.alumnoSeleccionado;
    const id_materia = req.body.idmateria;
    const turno = req.body.turnoinscripcion;

    console.log("ID ALUMNO: " + id_alumno);
    console.log("ID MATERIA: " + id_materia);
    console.log("TURNO: " + turno);

    conexion.query('INSERT INTO inscripcion_alumnos_materias (alumno_id, materia_id, turno, calificacion_trimestre1, calificacion_trimestre2, calificacion_trimestre3) VALUES (?, ?, ?, ?, ?, ?);', [id_alumno, id_materia, turno, 0, 0, 0], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/administrador');
        }
    })
}