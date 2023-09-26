const express = require('express');
const router = express();
const conexion = require('./database/db');
const path = require ('path');


//******************************************************
//************** LOGIN *************************
router.get('/', (req, res) => {
    res.render('login.ejs');
})

//******************************************************
//************** DOCENTE *************************

//CURSOS DOCENTE
router.get('/docente', (req, res) => {
    conexion.query('SELECT * FROM materias', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('index-docente.ejs', {results: results});
        }
    })
})


//VER NOTAS DEL CURSO
router.get('/notas-cursos-docente/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('SELECT u.id_usuario, u.nombre, u.apellido, u.dni, u.estado, ma.id_materia, ma.nombre_materia, ma.anio_cursada, ma.division , i.turno, i.calificacion_trimestre1, i.calificacion_trimestre2, i.calificacion_trimestre3 FROM inscripcion_alumnos_materias AS i INNER JOIN usuarios AS u ON u.id_usuario = i.alumno_id INNER JOIN materias AS ma ON ma.id_materia = i.materia_id WHERE materia_id = ?;', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            console.log(results);
            res.render('notas-cursos-docente.ejs', {alumnos: results});
        }
    })
})

//EDITAR NOTA
router.get('/editar-nota/:id/:id_materia', (req, res) => {

    const id = req.params.id;
    const id_materia = req.params.id_materia;

    conexion.query('SELECT u.id_usuario, u.nombre, u.apellido, u.dni, ma.id_materia, ma.nombre_materia, ma.anio_cursada, ma.division , i.turno, i.calificacion_trimestre1, i.calificacion_trimestre2, i.calificacion_trimestre3 FROM inscripcion_alumnos_materias AS i INNER JOIN usuarios AS u ON u.id_usuario = i.alumno_id INNER JOIN materias AS ma ON ma.id_materia = i.materia_id WHERE id_usuario = ? AND id_materia = ?;', [id, id_materia], (error, results) => {
        if(error){
            throw error;
        }else{
            console.log(results);
            res.render('editar-nota-docente.ejs', {alumno: results[0]})
        }
    })
})

//AGREGAR NOTA
router.get('/agregar-nota', (req, res) => {

    const id_materia = req.params.id_materia;

    conexion.query("SELECT u.id_usuario, u.nombre, u.apellido, u.dni, u.rol, ma.id_materia, ma.nombre_materia, ma.anio_cursada, ma.division , i.turno, i.calificacion_trimestre1, i.calificacion_trimestre2, i.calificacion_trimestre3 FROM inscripcion_alumnos_materias AS i INNER JOIN usuarios AS u ON u.id_usuario = i.alumno_id INNER JOIN materias AS ma ON ma.id_materia = i.materia_id;", (error, results) => {
        if(error){
            throw error;
        }else{
            console.log(results);
            res.render('agregar-nota-docente.ejs', {alumnos: results});
        }
    })
})



//ELIMINAR NOTAS de ALUMNO
router.get('/delete/:id/:id_materia', (req, res) => {
    
    console.log(req.params.id)
    const id = req.params.id;
    const id_materia = req.params.id_materia;

    conexion.query('DELETE FROM inscripcion_alumnos_materias WHERE alumno_id = ? AND materia_id = ?', [id, id_materia], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/cursos-docente');
        }
    })
})

//******************************************************
//************** ADMINISTRADOR *************************
//INICIO
router.get('/administrador', (req, res) => {

    const queries = [
        "SELECT * FROM usuarios",
        "SELECT * FROM usuarios INNER JOIN materias ON materias.profesor_id = usuarios.id_usuario;"
    ]

    conexion.query(queries.join(';'), (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('index-admin.ejs', {
                usuarios: results[0],
                materias: results[1]
            });
        }
    })
})

//*****************
//******MATERIAS
//CREAR MATERIA
router.get('/crear-materia', (req, res) => {

    conexion.query('SELECT * FROM usuarios;', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('crear-materia-admin.ejs', {usuarios: results});
        }
    })
    
})

//EDITAR MATERIA
router.get('/editar-materia/:id', (req, res) => {
    const id = req.params.id;

    const query1 = "SELECT * FROM materias INNER JOIN usuarios ON usuarios.id_usuario = materias.profesor_id WHERE id_materia = ?";
    const query2 = "SELECT * FROM usuarios WHERE rol = 'Docente'";

    conexion.query(query1, [id], (error1, results1) => {
        if (error1) {
            throw error1;
        } else {
            // Procesar los resultados de la primera consulta (results1)
            conexion.query(query2, (error2, results2) => {
                if (error2) {
                    throw error2;
                } else {
                    // Procesar los resultados de la segunda consulta (results2)
                    console.log("****EDITAR-MATERIA*****");
                    console.log(results1);
                    console.log(results2);

                    res.render('editar-materia-admin.ejs', {
                        materia: results1[0],
                        profesores: results2 // Puedes pasar los resultados de ambas consultas a la plantilla
                    });
                }
            });
        }
    });

});

//ELIMINAR MATERIA
router.get('/delete-materia/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('UPDATE materias SET estado = 0 WHERE id_materia= ?;', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/administrador');
        }
    })
})

router.get('/materias-eliminadas', (req, res) => {

    conexion.query('SELECT * FROM materias WHERE estado = 0', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('materias-eliminadas-admin.ejs', {materias: results});
        }
    })
})


//ASOCIAR MATERIA a ALUMNO
router.get('/asociar-alumno-materia/:id', (req, res) => {

    const id = req.params.id;

    const query1 = "SELECT * FROM materias WHERE id_materia=?";
    const query2 = "SELECT * FROM usuarios WHERE rol = 'Estudiante'";
    const query3 = "SELECT u.id_usuario, u.nombre, u.apellido, i.turno FROM inscripcion_alumnos_materias AS i  INNER JOIN usuarios AS u ON u.id_usuario = i.alumno_id  INNER JOIN materias AS ma ON ma.id_materia = i.materia_id  WHERE materia_id = ?;";
    
    conexion.query(query1, [id], (error1, results1) => {
        if(error1){
            throw error1;
        }else{
            conexion.query(query2, (error2, results2) => {
                if(error2){
                    throw error2;
                }else{
                    conexion.query(query3, [id] , (error3, results3) => {
                        if(error3){
                            throw error3;
                        }else{
                            res.render('asociar-alumnomateria-admin.ejs', {
                                materia: results1[0],
                                estudiantes: results2,
                                inscripciones: results3
                            });
                        }
                    })
                }
            })
        }
    })

})

//*****************
//******ALUMNOS

//CREAR ALUMNO
router.get('/crear-alumno', (req, res) => {

    conexion.query('SELECT * FROM usuarios;', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('crear-alumno-admin.ejs', {usuarios: results});
        }
    })
    
})

//EDITAR ALUMNO
router.get('/editar-alumno/:id', (req, res) => {
    const id = req.params.id;

    conexion.query('SELECT * FROM usuarios WHERE id_usuario=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('editar-alumno-admin.ejs', {alumno: results[0]})
        }
    })
})

//ELIMINAR ALUMNO
router.get('/delete-alumno/:id', (req, res) => {
    const id = req.params.id;

    // Primero, elimina registros relacionados en inscripcion_alumnos_materias
    conexion.query('DELETE FROM inscripcion_alumnos_materias WHERE alumno_id = ?', [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            // Luego, elimina el usuario de la tabla usuarios
            conexion.query('UPDATE usuarios SET estado = 0 WHERE id_usuario= ?;', [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/administrador');
                }
            });
        }
    });
});

//RESET DE CONTRASEÑAS
router.get('/reset-password/:id', (req, res) => {
    const id = req.params.id;

    conexion.query('SELECT * FROM usuarios WHERE id_usuario=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('reset-password-admin.ejs', {alumno: results[0]})
        }
    })
})


//*****************
//******DOCENTE
//CREAR DOCENTE
router.get('/crear-docente', (req, res) => {

    conexion.query('SELECT * FROM usuarios;', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('crear-docente-admin.ejs', {usuarios: results});
        }
    })
    
})

//EDITAR DOCENTE
router.get('/editar-docente/:id', (req, res) => {
    const id = req.params.id;

    conexion.query('SELECT * FROM usuarios WHERE id_usuario=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('editar-docente-admin.ejs', {docente: results[0]})
        }
    })
})

//ELIMINAR DOCENTE
router.get('/delete-docente/:id', (req, res) => {
    const id = req.params.id;

    // Primero, elimina registros relacionados en inscripcion_alumnos_materias
    conexion.query("DELETE FROM materias WHERE profesor_id = ?", [id], (error, results) => {
        if (error) {
            throw error;
        } else {
            // Luego, elimina el usuario de la tabla usuarios
            conexion.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.redirect('/administrador');
                }
            });
        }
    });
});


//************************
//********* CRUD *********/
// INVOCAMOS EL CRUD
const crud = require('./controllers/crud'); // => Importa el controlador de CRUD
const crudAdminMaterias = require('./controllers/crudadmin-materias');
const crudAdminAlumnos = require('./controllers/crudadmin-alumnos');
const crudAdminInscripciones = require('./controllers/crudadmin-inscripciones');
const crudContrasenia = require('./controllers/crudcontrasenia');

//CRUD DOCENTE
router.post('/update', crud.update); // => Llama a la función del controlador

//CRUD ADMIN MATERIAS
router.post('/save-materia', crudAdminMaterias.save);
router.post('/editar-materia', crudAdminMaterias.update);

//CRUD ADMIN ALUMNOS
router.post('/save-usuario', crudAdminAlumnos.save);
router.post('/editar-usuario', crudAdminAlumnos.update);

//CRUD INSCRIPCION
router.post('/save-inscripcion', crudAdminInscripciones.save);

//RESET PASSWORD
router.post('/reset-password', crudContrasenia.update);

//EXPORTAMOS EL ROUTER PARA QUE LO USE EL app.js
module.exports = router;