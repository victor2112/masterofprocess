const conn = require('../../config/database');

module.exports = app => {
    app.get("/comic", (req, res) => {
        let query = "SELECT c.id, c.nombre, c.año anio, c.sinopsis, c.editorial, c.usuario FROM comic c, usuario u WHERE c.usuario = u.id";
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, comics: rows });
        })
    });


    app.post("/comic", (req, res) => {
        let comic = req.body;
        let query = `INSERT INTO comic (nombre, año, sinopsis, editorial, usuario) VALUES ('${comic.nombre}', '${comic.año}', '${comic.sinopsis}', '${comic.editorial}', '${comic.usuario}')`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(500).json({ status: 0, message: err });
            else res.json({ status: 1, message: "Comic insertado satisfactoriamente" });
        });
    });


}