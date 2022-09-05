const conn = require('../../config/database');

module.exports = (app) => {

    // Get de instancias de un Proceso por Usuario
    app.get("/fields/:idProceso", (req, res) => {
        let query = `select c.idFormulario idFormulario, c.nombre nombre, c.pos pos, tc.nombre tipo, c.idLista idLista ` +
            `from campos c ` +
            `join tipo_campo tc on c.idTipo = tc.idTipo ` +
            `join procesos p on c.idFormulario = p.idFormulario ` +
            `where idProceso = ${req.params.idProceso} ` +
            `order by c.pos`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Insert de valores_campos
    app.post('/fields/value/new', (req, res, next) => {
        let query = `INSERT INTO VALORES_CAMPOS (IDFORMULARIO, POS, IDINSTANCIA, VALOR) ` +
            `VALUES ('${req.body.idFormulario}', '${req.body.pos}', ` +
            `'${req.body.idInstancia}', '${req.body.valor}')`;
        //console.log(query);
        //console.log(req.body);
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Valor_campo insertado satisfactoriamente" });
            }
        });
    });



}