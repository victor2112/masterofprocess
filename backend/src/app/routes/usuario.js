const conn = require('../../config/database');

module.exports = (app) => {

    // Get de todos los usuarios
    app.get("/usuario", (req, res) => {
        let query = "SELECT idUsuario, nombre, departamento, idTipoUsuario, usuario, password, email FROM usuarios";
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "" });
        })
    });

    // Get de un usuario en particular
    app.get("/usuario/:usuario/:password", (req, res) => {
        let query = `SELECT idUsuario, nombre, departamento, idTipoUsuario, usuario, password, email ` +
            `FROM usuarios where usuario = '${req.params.usuario}' ` +
            `and password = '${req.params.password}'`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else {
                console.log(rows);
                res.json({ status: 1, data: rows, message: "OK" });
            }


        })
    });

    // Post para crear un usuario
    app.post('/usuario', (req, res, next) => {
        let query = `INSERT INTO usuarios (nombre, departamento, idTipoUsuario, usuario, password, email) ` +
            `VALUES ('${req.body.nombre}', '${req.body.departamento}', 2, ` +
            `'${req.body.usuario}', '${req.body.password}, ${req.body.email}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Usuario insertado satisfactoriamente" });
            }
        });
    });

    // Put para modificar un usuario
    app.put('/usuario/:idUsuario', (req, res) => {
        let query = `UPDATE usuarios SET nombre = '${req.body.nombre}', ` +
            `departamento = '${req.body.departamento}', ` +
            `idTipoUsuario = '${req.body.idTipoUsuario}', ` +
            `usuario = '${req.body.usuario}', ` +
            `password = '${req.body.password}', ` +
            `email = '${req.body.email}' ` +
            `where idUsuario = '${req.params.idUsuario}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Usuario modificado satisfactoriamente" });
            }
        });
    });

    // Delete para eliminar un usuario
    app.delete('/usuario/:idUsuario', (req, res) => {
        let query = `DELETE FROM usuarios WHERE idUsuario = '${req.params.idUsuario}'`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Usuario eliminado satisfactoriamente" });
            }
        });
    });

}