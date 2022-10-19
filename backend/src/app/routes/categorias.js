const conn = require('../../config/database');

module.exports = (app) => {
    /* ----------------------CATEGORIAS-------------------- */

    app.get('/categorias', (req, res) => {
        const sql = 'SELECT * FROM GRAF_CATEGORIA';
        conn.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.json({ message: 'No hay resultados' });
            }
        });
    });

    app.get('/categorias/:idCategoria', (req, res) => {
        const { idCategoria } = req.params;
        const sql = `SELECT * FROM GRAF_CATEGORIA WHERE PK_CATE = ${idCategoria}`;
        conn.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json(results);
            } else {
                res.json({ message: 'No hay resultados' });
            }
        });
    });

    app.post('/addCategoria', (req, res) => {
        const sql = `INSERT INTO GRAF_CATEGORIA SET ?`;
        const categoriaObject = {
            NOMBRE_CATE: req.body.nombreCategoria,
            COLOR_CATE: req.body.colorCategoria,
            DATOS_CATE: req.body.datosCategoria
        };

        conn.query(sql, categoriaObject, err => {
            if (err) throw err;
            res.json({ message: 'Categoria Creada' });
        });
    });

    app.put('/updateCategoria/:idCategoria', (req, res) => {
        const { idCategoria } = req.params;
        const { nombreCategoria, colorCategoria, datosCategoria } = req.body;
        const sql = `UPDATE GRAF_CATEGORIA SET NOMBRE_CATE = '${nombreCategoria}' , COLOR_CATE = '${colorCategoria}', DATOS_CATE = '${datosCategoria}'
        WHERE PK_CATE = ${idCategoria}`

        conn.query(sql, err => {
            if (err) throw err;
            res.json({ message: 'Categoria Actualizada' });
        });

    });

    app.delete('/deleteCategoria/:idCategoria', (req, res) => {
        const { idCategoria } = req.params;
        const sql = `DELETE FROM GRAF_CATEGORIA WHERE PK_CATE = ${idCategoria}`
        conn.query(sql, err => {
            if (err) throw err;
            res.json({ message: 'Categoria Borrada' });
        });
    });

}