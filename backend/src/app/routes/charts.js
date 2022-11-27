const conn = require('../../config/database');

module.exports = (app) => {
    /* ----------------------Graficas-------------------- */

    app.get('/charts/states/:idProcess', (req, res) => {
        const sql = `Select pro.idProceso idProceso, pro.nombre NombreProceso, e.idEstado idEstado, e.nombre estado, count(*) Instancias ` +
            `from INSTANCIAS ins ` +
            `join PROCESOS pro on pro.idProceso = ins.idProceso ` +
            `join estados e on e.idEstado = ins.idEstado ` +
            `where pro.idProceso = ${req.params.idProcess} ` +
            `group by pro.idProceso, pro.nombre, e.idEstado, e.nombre `;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.json({ message: 'No hay resultados' });
            }
        });
    });

    app.get('/charts/completion/:idProcess', (req, res) => {
        const sql = `Select DATE(ins.fechaModificacion) fechaModificacion, count(*) Instancias ` +
            `from INSTANCIAS ins ` +
            `join PROCESOS pro on pro.idProceso = ins.idProceso ` +
            `join estados e on e.idEstado = ins.idEstado ` +
            `where pro.idProceso = ${req.params.idProcess} ` +
            `and e.final = 'Si' ` +
            `group by DATE(ins.fechaModificacion) ` +
            `order by DATE(ins.fechaModificacion) asc`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.json({ message: 'No hay resultados' });
            }
        });
    });



}