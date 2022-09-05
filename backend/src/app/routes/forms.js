const conn = require('../../config/database');

module.exports = (app) => {

    // Get de instancias de un Proceso por Usuario
    app.get("/forms/:idInstancia", (req, res) => {
        let query = `select vc.idFormulario idFormulario, c.pos pos, c.nombre nombre, vc.valor valor, tc.nombre tipo, c.idLista idLista ` +
            `from valores_campos vc ` +
            `join campos c on (c.idFormulario = vc.idFormulario and c.pos = vc.pos) ` +
            `join tipo_campo tc on c.idTipo = tc.idTipo ` +
            `where vc.idInstancia = ${req.params.idInstancia} ` +
            `order by pos`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    // Update de un campo 
    app.put("/forms/update/:idFormulario/:pos/:idInstancia/:valor", (req, res) => {
        let query = `update valores_campos set valor = '${req.params.valor}' ` +
            `where idFormulario = ${req.params.idFormulario} ` +
            `and pos = ${req.params.pos} ` +
            `and idInstancia = ${req.params.idInstancia}`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Valor de Campo modificado satisfactoriamente" });
            }
        });

    });

}