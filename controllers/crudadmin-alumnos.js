const conexion = require('../database/db');

//Editar Alumno
exports.update = (req, res) => {
    const rol = req.body.rol;
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni = req.body.dni;
    const correo = req.body.correo;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    conexion.query('UPDATE usuarios SET nombre=?, apellido=?, dni=?, correo=?, fecha_nacimiento=?, direccion=?, telefono=?, rol=? WHERE id_usuario = ?', [nombre, apellido, dni, correo, fecha_nacimiento, direccion, telefono, rol, id ], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect("/administrador");
        }
    })
}

//Crear Alumno
exports.save = (req, res) => {
    const rol = req.body.rol;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni = req.body.dni;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const contrasenia = req.body.contrasenia;
    const estado = 1;

    conexion.query('INSERT INTO usuarios (nombre, apellido, dni, correo, contrasenia, fecha_nacimiento, direccion, telefono, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [nombre, apellido, dni, correo, contrasenia, fecha_nacimiento, direccion, telefono, rol, estado], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/administrador');
        }
    })
}