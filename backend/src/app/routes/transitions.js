const conn = require('../../config/database');

module.exports = (app) => {

    // Get de todas las transiciones
    app.get("/transitions/", (req, res) => {
        let query = `select t.idTransition idTransition, o.nombre origin, t.idOrigin idOrigin, d.nombre destiny, t.idDestiny idDestiny, p.nombre processName, t.idProcess idProcess ` +
            `from transitions t ` +
            `join estados o on o.idEstado = t.idOrigin ` +
            `join estados d on d.idEstado = t.idDestiny ` +
            `join procesos p on p.idProceso = t.idProcess ` +
            `order by t.idTransition asc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Get de solo una transicion
    app.get("/transitions/:idTransition", (req, res) => {
        let query = `select t.idTransition idTransition, o.nombre origin, t.idOrigin idOrigin, d.nombre destiny, t.idDestiny idDestiny, p.nombre processName, t.idProcess idProcess ` +
            `from transitions t ` +
            `join estados o on o.idEstado = t.idOrigin ` +
            `join estados d on d.idEstado = t.idDestiny ` +
            `join procesos p on p.idProceso = t.idProcess ` +
            `where t.idTransition = ${req.params.idTransition}`
        `order by t.idTransition asc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Crear una transition
    app.post('/transitions/:idOrigin/:idDestiny/:idProcess', (req, res, next) => {
        let query = `insert into transitions (idOrigin, idDestiny, idProcess) ` +
            `values(${req.params.idOrigin}, ${req.params.idDestiny}, ${req.params.idProcess})`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Transicion creada satisfactoriamente" });
            }
        });
    });


    //Actualizar una transicion
    app.put('/transitions/:idTransition/:idOrigin/:idDestiny/:idProcess', (req, res, next) => {
        let query = `update transitions ` +
            `set idOrigin = '${req.params.idOrigin}', ` +
            `idDestiny = ${req.params.idDestiny}, ` +
            `idProcess = '${req.params.idProcess}', ` +
            `where idTransition = ${req.params.idTransition}`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Transicion actualizado satisfactoriamente" });
            }
        });
    });

    // Eliminar una transicion
    app.delete('/transitions/:idTransition', (req, res) => {
        let query = `delete from transitions where idTransition = '${req.params.idTransition}'`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Transición eliminada satisfactoriamente" });
            }
        });
    });


}