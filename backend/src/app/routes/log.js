const conn = require('../../config/database');

module.exports = (app) => {

    // Get de logs para una instancia
    app.get("/log/:idInstance", (req, res) => {
        let query = `select l.idLog, l.idInstance, l.idUser, u.nombre userName, l.modificationDate, l.idLogType, lt.type typeName,  ` +
            `case  ` +
            `when l.idLogType = 2 then eo.nombre ` +
            `else l.oldData ` +
            `end as 'oldData', ` +
            `case  ` +
            `when l.idLogType = 2 then en.nombre ` +
            `else l.newData ` +
            `end as 'newData' ` +
            `from log l ` +
            `join usuarios u on u.idUsuario = l.idUser ` +
            `join log_type lt on lt.idLogType = l.idLogType ` +
            `left join estados eo on eo.idEstado = l.oldData ` +
            `left join estados en on en.idEstado = l.newData ` +
            `where idInstance =  ${req.params.idInstance} ` +
            `order by l.idLog desc`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    app.post('/log/:idInstance/:idUser/:idLogType/:oldData/:newData', (req, res, next) => {
        let query = `insert into LOG (idInstance, idUser, modificationDate, idLogType, oldData, newData) ` +
            `values(${req.params.idInstance}, ${req.params.idUser}, timestamp(SYSDATE()), ${req.params.idLogType}, '${req.params.oldData}', '${req.params.newData}')`;
        //console.log(query);
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Log creado satisfactoriamente" });
            }
        });
    });

}