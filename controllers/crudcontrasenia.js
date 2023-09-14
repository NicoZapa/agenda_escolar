const conexion = require('../database/db');

//Resetear contraseña
exports.update = (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    conexion.query('UPDATE usuarios SET contrasenia=? WHERE id_usuario = ?', [password, id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect("/administrador");
        }
    })
}