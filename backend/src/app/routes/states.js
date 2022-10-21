const conn = require('../../config/database');

module.exports = (app) => {

    // Get de estados para cambiar de un estado origen en especifico
    app.get("/states/:idProcess/:idOrigin", (req, res) => {
        let query = `select t.idTransition idTransition, eo.nombre origin, eo.idEstado idOrigin, ed.nombre destiny, ed.idEstado idDestiny, p.nombre processName, t.idProcess idProcess ` +
            `from transitions t ` +
            `join estados ed on ed.idEstado = t.idDestiny ` +
            `join estados eo on eo.idEstado = t.idOrigin ` +
            `join procesos p on p.idProceso = t.idProcess ` +
            `where t.idProcess = ${req.params.idProcess} ` +
            `and t.idOrigin = ${req.params.idOrigin}`;
        //console.log(query);
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Get de estado inicial para un processId
    app.get("/initialState/:idProcess", (req, res) => {
        let query = `select idEstado from ESTADOS where idProceso = ${req.params.idProcess} and initial = 'Si'`;
        console.log(query);
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    //Modulo de Configuraciones

    //Get de todos los estado
    app.get("/states/", (req, res) => {
        let query = `select e.idEstado idState, e.nombre stateName, e.idProceso idProcess, p.nombre processName, e.initial initial, e.final final ` +
            `from estados e ` +
            `join procesos p on p.idProceso = e.idProceso ` +
            `order by p.nombre desc, e.nombre desc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Get de solo un estado
    app.get("/states/:idState", (req, res) => {
        let query = `select e.idEstado idState, e.nombre stateName, e.idProceso idProcess, p.nombre processName, e.initial initial, e.final final ` +
            `from estados e ` +
            `join procesos p on p.idProceso = e.idProceso ` +
            `where e.idEstado = ${req.params.idState}`;
        `order by p.nombre desc, e.nombre desc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Crear un estado
    app.post('/states/:stateName/:idProcess/:initial/:final', (req, res, next) => {
        let query = `insert into estados(nombre, idProceso, initial, final) ` +
            `values('${req.params.stateName}', ${req.params.idProcess}, '${req.params.initial}', '${req.params.final}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Estado creado satisfactoriamente" });
            }
        });
    });


    //Actualizar un estado
    app.put('/states/:idState/:stateName/:idProcess/:initial/:final', (req, res, next) => {
        let query = `update estados ` +
            `set nombre = '${req.params.stateName}', ` +
            `idProceso = ${req.params.idProcess}, ` +
            `initial = '${req.params.initial}', ` +
            `final = '${req.params.final}' ` +
            `where idEstado = ${req.params.idState}`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Estado actualizado satisfactoriamente" });
            }
        });
    });

    // Eliminar un estado
    app.delete('/states/:idState', (req, res) => {
        let query = `delete from estados where idEstado = '${req.params.idState}'`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Estado eliminado satisfactoriamente" });
            }
        });
    });


}