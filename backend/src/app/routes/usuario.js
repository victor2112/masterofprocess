const conn = require('../../config/database');

module.exports = (app) => {

    // Get de todos los usuarios
    app.get("/usuario", (req, res) => {
        let query = "SELECT idUsuario, nombre, departamento, idTipoUsuario, usuario, contraseña FROM usuarios";
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, usuarios: rows });
        })
    });

    // Get de un usuario en particular
    app.get("/usuario/:usuario/:password", (req, res) => {
        let query = `SELECT idUsuario, nombre, departamento, idTipoUsuario, usuario, contraseña ` +
            `FROM usuarios where usuario = '${req.params.usuario}' ` +
            `and contraseña = '${req.params.password}'`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, usuarios: rows });
        })
    });

    // Post para crear un usuario
    app.post('/usuario', (req, res, next) => {
        let query = `INSERT INTO usuarios (nombre, departamento, idTipoUsuario, usuario, contraseña) ` +
            `VALUES ('${req.body.nombre}', '${req.body.departamento}', 2, ` +
            `'${req.body.usuario}', '${req.body.contraseña}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, message: "Error en la db" });
            } else {
                res.json({ status: 1, message: "Usuario insertado satisfactoriamente" });
            }
        });
    });

    // Put para modificar un usuario
    app.put('/usuario/:idUsuario', (req, res) => {
        let query = `UPDATE usuarios SET nombre = '${req.body.nombre}', ` +
            `departamento = '${req.body.departamento}', ` +
            `idTipoUsuario = '${req.body.idTipoUsuario}', ` +
            `usuario = '${req.body.usuario}', ` +
            `contraseña = '${req.body.contraseña}' ` +
            `where idUsuario = '${req.params.idUsuario}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, message: "Error en la db" });
            } else {
                res.json({ status: 1, message: "Usuario modificado satisfactoriamente" });
            }
        });
    });

    // Delete para eliminar un usuario
    app.delete('/usuario/:idUsuario', (req, res) => {
        let query = `DELETE FROM usuarios WHERE idUsuario = '${req.params.idUsuario}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, message: "Error en la db" });
            } else {
                res.json({ status: 1, message: "Usuario eliminado satisfactoriamente" });
            }
        });
    });

}