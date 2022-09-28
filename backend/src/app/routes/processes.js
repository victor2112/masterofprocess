const conn = require('../../config/database');

module.exports = (app) => {

    //Get de todos los procesos
    app.get("/processes/", (req, res) => {
        let query = `select p.idProceso idProcess, p.nombre processName, p.fechaCreacion dateCreated, f.nombre formName, p.idFormulario idForm ` +
            `from procesos p ` +
            `join formularios f on f.idFormulario = p.idFormulario`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Get de solo un proceso
    app.get("/processes/:idProcess", (req, res) => {
        let query = `select p.idProceso idProcess, p.nombre processName, p.fechaCreacion dateCreated, f.nombre formName, p.idFormulario idForm ` +
            `from procesos p ` +
            `join formularios f on f.idFormulario = p.idFormulario ` +
            `where p.idProceso = ${req.params.idProcess}`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Crear un proceso
    app.post('/processes/:processName/:idUser/:idForm', (req, res, next) => {
        let query = `insert into procesos (nombre, fechaCreacion, UsuarioCreador, idFormulario) ` +
            `values('${req.params.processName}', DATE(SYSDATE()), ${req.params.idUser}, ${req.params.idForm})`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Proceso creado satisfactoriamente" });
            }
        });
    });


    //Actualizar un proceso
    app.put('/processes/:idProcess/:processName/:idForm', (req, res, next) => {
        let query = `update procesos set ` +
            `nombre = '${req.params.processName}', ` +
            `idFormulario = ${req.params.idForm} ` +
            `where idProceso = ${req.params.idProcess}`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Proceso actualizado satisfactoriamente" });
            }
        });
    });

    // Eliminar un proceso
    app.delete('/processes/:idProcess', (req, res) => {
        let query = `delete from procesos where idProceso = '${req.params.idProcess}'`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Proceso eliminado satisfactoriamente" });
            }
        });
    });

    // Get de todos los Procesos por Usuario
    app.get("/process/:idUsuario", (req, res) => {
        let query = `Select pro.idProceso idProceso, pro.nombre nombreProceso, count(*) visibles, total.Instancias total ` +
            `from INSTANCIAS ins ` +
            `join PROCESOS pro on pro.idProceso = ins.idProceso ` +
            `join ( ` +
            `Select pro.idProceso idProceso, pro.nombre NombreProceso, count(*) Instancias ` +
            `from INSTANCIAS ins ` +
            `join PROCESOS pro on pro.idProceso = ins.idProceso ` +
            `group by pro.idProceso, pro.nombre ` +
            `) total on pro.idProceso = total.idProceso ` +
            `join ESTADOS es on es.idEstado = ins.idEstado ` +
            `join PERMISOS per on per.IdEstado = es.IdEstado ` +
            `where per.idUsuario = ${req.params.idUsuario} ` +
            `group by pro.idProceso, pro.nombre`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

}