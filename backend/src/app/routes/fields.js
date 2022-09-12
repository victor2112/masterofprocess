const conn = require('../../config/database');

module.exports = (app) => {

    // Get de campos de un Proceso
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



    // Get de campos de un Formulario
    app.get("/fields/forms/:idForm", (req, res) => {
        let query = `select c.idFormulario idFormulario, c.nombre nombre, c.pos pos, tc.nombre tipo, c.idLista idLista ` +
            `from campos c ` +
            `join tipo_campo tc on c.idTipo = tc.idTipo ` +
            `join formularios f on c.idFormulario = f.idFormulario ` +
            `where c.idFormulario = ${req.params.idForm} ` +
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

    // Insert de campos
    app.post('/fields/new', (req, res, next) => {
        let query = `INSERT INTO CAMPOS (IDFORMULARIO, POS, IDTIPO, NOMBRE, IDLISTA) VALUES (${req.body.idForm}, ${req.body.pos}, ${req.body.idType}, '${req.body.name}', ${req.body.idList}) `;
        //console.log(query);
        //console.log(req.body);
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Campos insertado satisfactoriamente" });
            }
        });
    });

    // Delete de campos
    app.delete('/fields/:idForm/:pos', (req, res, next) => {
        let query = `delete from campos where idFormulario = ${req.params.idForm} and pos = ${req.params.pos}`;
        //console.log(query);
        //console.log(req.body);
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Campo eliminado satisfactoriamente" });
            }
        });
    });

    // Get de datos para un campo
    app.get("/fields/:idForm/:pos", (req, res) => {
        let query = `select c.idFormulario idFormulario, c.nombre nombre, c.pos pos, tc.nombre tipo, c.idLista idLista ` +
            `from campos c ` +
            `join tipo_campo tc on c.idTipo = tc.idTipo ` +
            `join formularios f on c.idFormulario = f.idFormulario ` +
            `where c.idFormulario = ${req.params.idForm} ` +
            `and c.pos = ${req.params.pos} ` +
            `order by c.pos`;
        //console.log(query);
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    // Put de un campo
    app.put("/fields/:idForm/:pos", (req, res) => {
        let query = `update campos ` +
            `set pos = ${req.body.pos}, ` +
            `idTipo = ${req.body.idType}, ` +
            `nombre = '${req.body.name}', ` +
            `idLista = ${req.body.idList} ` +
            `where idFormulario = ${req.params.idForm} ` +
            `and pos = ${req.params.pos}`;
        //console.log(query);
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


}