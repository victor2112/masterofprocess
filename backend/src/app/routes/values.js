const conn = require('../../config/database');

module.exports = (app) => {

    // Crear un valor lista
    app.post('/values/:idList/:name', (req, res, next) => {
        let query = `insert into valores_lista (idLista, nombre) values(${req.params.idList}, '${req.params.name}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Valor lista creado satisfactoriamente" });
            }
        });
    });

    // Actualizar un valor lista
    app.put('/values/:idValue/:name', (req, res, next) => {
        let query = `update valores_lista set nombre = '${req.params.name}' where idValor = ${req.params.idValue}`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Valor lista actualizado satisfactoriamente" });
            }
        });
    });

    // Actualizar un valor lista
    app.delete('/values/:idValue', (req, res, next) => {
        let query = `delete from valores_lista where idValor = ${req.params.idValue}`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Valor lista actualizado satisfactoriamente" });
            }
        });
    });


    app.get("/values/:idValue", (req, res) => {
        let query = `select idValor idValue, nombre name from valores_lista where idValor = ${req.params.idValue}`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });



}