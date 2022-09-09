const conn = require('../../config/database');

module.exports = (app) => {

    // Get de estados para cambiar de un estado origen en especifico
    app.get("/states/:idProcess/:idOrigin", (req, res) => {
        let query = `select p.nombre process, eo.idEstado origin, eo.nombre originName, ed.idEstado destiny, ed.nombre destinyName ` +
            `from transitions t ` +
            `join estados ed on ed.idEstado = t.idDestiny ` +
            `join estados eo on eo.idEstado = t.idOrigin ` +
            `join procesos p on p.idProceso = t.idProcess ` +
            `where t.idProcess = ${req.params.idProcess} ` +
            `and t.idOrigin = ${req.params.idOrigin}`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Get de estado inicial para un processId
    app.get("/states/:idProcess", (req, res) => {
        let query = `select idEstado from ESTADOS where idProceso = ${req.params.idProcess} and initial = 'Si'`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

}