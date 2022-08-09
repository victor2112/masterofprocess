const conn = require('../../config/database');

module.exports = (app) => {
    app.get("/usuario", (req, res) => {
        let query = "SELECT id, nombre, usuario, password, fecha_nacimiento, sexo FROM usuario";
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({status: 0, message: "No se pudo obtener informacion"});
            else res.json({status: 1, usuarios : rows});
        })
    });

    app.get("/usuario/usuario/:usuario/:password", (req, res) => {
        let query = `SELECT id, nombre, usuario, password, fecha_nacimiento, sexo FROM usuario where usuario = '${req.params.usuario}' and password = '${req.params.password}'`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({status: 0, message: "No se pudo obtener informacion"});
            else res.json({status: 1, usuarios : rows});
        })
    });
    
    app.post('/usuario', (req, res, next) => {
        let query = `INSERT INTO usuario (nombre, usuario, password, fecha_nacimiento, sexo) VALUES ('${req.body.nombre}', '${req.body.usuario}', '${req.body.password}', '${req.body.fecha_nacimiento}', '${req.body.sexo}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({status: 0, message: "Error en la db"}); 
            } else {
                res.json({status: 1, message: "Usuario insertado satisfactoriamente"});
            }
        });
    });

    
}

