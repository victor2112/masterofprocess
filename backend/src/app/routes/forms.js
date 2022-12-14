const conn = require('../../config/database');

module.exports = (app) => {

    // Get de campos de un formulario por instancia
    app.get("/forms/:idInstancia", (req, res) => {
        /*let query = `select vc.idFormulario idFormulario, c.pos pos, c.nombre nombre, vc.valor valor, tc.nombre tipo, c.idLista idLista ` +
            `from valores_campos vc ` +
            `join campos c on (c.idFormulario = vc.idFormulario and c.pos = vc.pos) ` +
            `join tipo_campo tc on c.idTipo = tc.idTipo ` +
            `where vc.idInstancia = ${req.params.idInstancia} ` +
            `order by pos`;
        */

        let query = `select distinct vc.idFormulario idFormulario, c.pos pos, c.nombre nombre, ` +
            `case ` +
            `when tc.idTipo = 5 then vce.valor ` +
            `else vc.valor  ` +
            `end as 'valor',  ` +
            `tc.nombre tipo, c.idLista idLista  ` +
            `from valores_campos vc  ` +
            `join campos c on (c.idFormulario = vc.idFormulario and c.pos = vc.pos) ` +
            `join tipo_campo tc on c.idTipo = tc.idTipo  ` +
            `left join (select d.*  ` +
            `    from valores_campos d ` +
            `    where d.idInstancia = ${req.params.idInstancia}) vk on vk.idFormulario = c.idFormulario ` +
            `left join (select a.valor valor, b.valor externalKeyValue, a.idFormulario idFormulario, a.pos pos ` +
            `    from valores_campos a, ` +
            `    (select vcb.*  ` +
            `        from valores_campos vcb   ` +
            `        where vcb.idInstancia = (select min(vcbb.idInstancia) from valores_campos vcbb ` +
            `                            where vcbb.valor = (select vcbbb.valor from valores_campos vcbbb ` +
            `                                where vcbbb.pos = vcb.pos /*c.externalKeyValue*/ ` +
            `                                and vcbbb.idInstancia = ${req.params.idInstancia})) ` +
            `        ) b  ` +
            `    where a.idInstancia = (select min(vcbb.idInstancia) from valores_campos vcbb ` +
            `                            where vcbb.valor = (select vcbbb.valor from valores_campos vcbbb ` +
            `                                where vcbbb.pos = b.pos /*c.externalKeyValue*/ ` +
            `                                and vcbbb.idInstancia = ${req.params.idInstancia})) /*vc.valor*/ ` +
            `    ) vce on (vce.externalKeyValue = vk.valor and (vce.pos = c.externalPos or vce.pos = c.pos)) ` +
            `where vc.idInstancia = ${req.params.idInstancia} ` +
            `and (vk.pos = c.externalKeyValue or vk.pos = c.pos) ` +
            `and vce.valor is not null ` +
            `and case when tc.idTipo = 5 then c.externalPos = vce.pos else 1 end ` +
            `order by c.pos`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });


    // Update de un valor_campo 
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


    // Get de todos los formularios
    app.get("/formsList", (req, res) => {
        let query = `select idFormulario idForm, nombre name from formularios`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion 2" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Get de 1 formulario
    app.get("/formsList/:idForm", (req, res) => {
        let query = `select idFormulario idForm, nombre name from formularios where idFormulario = ${req.params.idForm}`;
        conn.query(query, (err, rows, field) => {
            if (err) res.status(400).json({ status: 0, message: "No se pudo obtener informacion 2" });
            else res.json({ status: 1, data: rows, message: "OK" });
        })
    });

    // Crear un formulario
    app.post('/forms/:name', (req, res, next) => {
        let query = `insert into formularios (nombre) values('${req.params.name}')`;
        conn.query(query, (err, rows, cols) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Formulario creado satisfactoriamente" });
            }
        });
    });

    //Actualizar el nombre de un formulario
    app.put('/forms/:idForm/:name', (req, res, next) => {
        let query = `update formularios set nombre = '${req.params.name}' where idFormulario = ${req.params.idForm}`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Formulario actualizado satisfactoriamente" });
            }
        });
    });

    // Eliminar un formulario
    app.delete('/forms/:idForm', (req, res) => {
        let query = `delete from formularios where idFormulario = '${req.params.idForm}'`;
        conn.query(query, (err, rows) => {
            if (err) {
                res.json({ status: 0, data: rows, message: "Error en la db" });
            } else {
                res.json({ status: 1, data: rows, message: "Formulario eliminado satisfactoriamente" });
            }
        });
    });



}