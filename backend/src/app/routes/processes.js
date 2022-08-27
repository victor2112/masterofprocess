const conn = require('../../config/database');

module.exports = (app) => {

    // Get de todos los Procesos por Usuario
    app.get("/processes/:idUsuario", (req, res) => {
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