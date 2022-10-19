const conn = require('../../config/database');

module.exports = (app) => {

    // Get de instancias de un Proceso por Usuario
    app.get("/instances/:idUsuario/:idProceso", (req, res) => {
        let query = `Select ins.idInstancia idInstancia, es.idEstado idEstado, es.nombre estado, ins.fechaCreacion fechaCreacion, ins.fechaModificacion fechaModificacion ` +
            `from INSTANCIAS ins ` +
            `join PROCESOS pro on pro.idProceso = ins.idProceso ` +
            `join ESTADOS es on es.idEstado = ins.idEstado ` +
            `join PERMISOS per on per.IdEstado = es.IdEstado ` +
            `where per.idUsuario = ${req.params.idUsuario} ` +
            `and pro.idProceso = ${req.params.idProceso}`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    app.post('/instances/new/:idProceso/:idEstado/:idUsuario', (req, res, next) => {
        let query = `INSERT INTO INSTANCIAS (IDPROCESO, IDESTADO, FECHACREACION, FECHAMODIFICACION, USUARIOCREADOR, USUARIOMODIFICACION) ` +
            `VALUES ('${req.params.idProceso}', '${req.params.idEstado}', ` +
            `timestamp(SYSDATE()), timestamp(SYSDATE()), ${req.params.idUsuario}, ${req.params.idUsuario})`;
        console.log(query);
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Instancia creada satisfactoriamente" });
            }
        });
    });

    // Get del numero maximo de una instancia
    app.get("/instances/number", (req, res) => {
        let query = `select max(idInstancia) instancias from instancias`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    app.put("/instances/:idInstance/:idState/:idUser", (req, res) => {
        let query = `update instancias ` +
            `set idEstado = ${req.params.idState}, ` +
            `usuarioModificacion = ${req.params.idUser}, ` +
            `fechaModificacion = timestamp(SYSDATE()) ` +
            `where idInstancia = ${req.params.idInstance}`
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Estado de instancia modificado satisfactoriamente" });
            }
        });
    });

}