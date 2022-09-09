const conn = require('../../config/database');

module.exports = (app) => {

    // Get de valores de una lista
    app.get("/lists/:idList", (req, res) => {
        let query = `Select nombre nombre from valores_lista where idLista = ${req.params.idList} `;
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





}