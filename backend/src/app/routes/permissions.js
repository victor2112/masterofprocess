const conn = require('../../config/database');

module.exports = (app) => {

    //Get de todos los permisos
    app.get("/permissions/", (req, res) => {
        let query = `select p.idPermiso idPermission, p.idUsuario idUser, u.nombre userName, p.idEstado idState, e.nombre stateName, e.idProceso idProcess, pr.nombre processName ` +
            `from permisos p ` +
            `join usuarios u on u.idUsuario = p.idUsuario ` +
            `join estados e on e.idEstado = p.idEstado ` +
            `join procesos pr on pr.idProceso = e.idProceso ` +
            `order by pr.nombre asc, u.nombre asc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    //Get de solo un permiso
    app.get("/permissions/:idPermission", (req, res) => {
        let query = `select p.idPermiso idPermission, p.idUsuario idUser, u.nombre userName, p.idEstado idState, e.nombre stateName, e.idProceso idProcess, pr.nombre processName ` +
            `from permisos p ` +
            `join usuarios u on u.idUsuario = p.idUsuario ` +
            `join estados e on e.idEstado = p.idEstado ` +
            `join procesos pr on pr.idProceso = e.idProceso ` +
            `where idPermiso = ${req.params.idPermission} ` +
            `order by pr.nombre asc, u.nombre asc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    //Crear un permiso
    app.post('/permissions/:idUser/:idState', (req, res, next) => {
        let query = `insert into permisos (idUsuario, fechaCreacion, idEstado) ` +
            `values('${req.params.idUser}', date(SYSDATE()), ${req.params.idState})`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                if (err.errno == 1062) {
                    res.json({ status: 0, data: rows, message: err.sqlMessage });
                } else {
                    res.json({ status: 0, data: rows, message: "Error en la db" });
                }
            } else {
                res.json({ status: 1, data: rows, message: "Permiso creado satisfactoriamente" });
            }
        });
    });


    //Actualizar un permiso
    app.put('/permissions/:idPermission/:idUser/:idState', (req, res, next) => {
        let query = `update permisos ` +
            `set idUsuario = ${req.params.idUser}, ` +
            `idEstado = ${req.params.idState}, ` +
            `where idPermiso = ${req.params.idPermission}`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Permiso actualizado satisfactoriamente" });
            }
        });
    });

    // Eliminar un permiso
    app.delete('/permissions/:idPermission', (req, res) => {
        let query = `delete from permisos where idPermiso = '${req.params.idPermission}'`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Permiso eliminado satisfactoriamente" });
            }
        });
    });


}