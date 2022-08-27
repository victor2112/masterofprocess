const conn = require('../../config/database');

module.exports = (app) => {

    // Get de instancias de un Proceso por Usuario
    app.get("/instances/:idUsuario/:idProceso", (req, res) => {
        let query = `Select ins.idInstancia idInstancia, es.nombre estado, ins.fechaCreacion fechaCreacion, ins.fechaModificacion fechaModificacion ` +
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

}