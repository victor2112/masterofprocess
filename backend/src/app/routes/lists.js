const conn = require('../../config/database');

module.exports = (app) => {

    // Get de valores de una lista
    app.get("/lists/:idList", (req, res) => {
        let query = `Select idValor idValue, nombre name from valores_lista where idLista = ${req.params.idList} `;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Get del nombre de una lista
    app.get("/lists/name/:idList", (req, res) => {
        let query = `Select nombre name from listas where idLista = ${req.params.idList} `;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Get de todas las listas
    app.get("/lists", (req, res) => {
        let query = `select idLista idList, nombre name from listas where idLista > 1`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    // Eliminar una lista
    app.delete('/lists/:idList', (req, res) => {
        let query = `delete from listas where idLista = '${req.params.idList}'`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Lista eliminado satisfactoriamente" });
            }
        });
    });

    //Actualizar el nombre de una lista
    app.put('/lists/:idList/:name', (req, res, next) => {
        let query = `update listas set nombre = '${req.params.name}' where idLista = ${req.params.idList}`;
        console.log(query + '2');
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Lista actualizada satisfactoriamente" });
            }
        });
    });

    // Crear una lista
    app.post('/lists/:name', (req, res, next) => {
        let query = `insert into listas (nombre) values('${req.params.name}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Lista creado satisfactoriamente" });
            }
        });
    });






}