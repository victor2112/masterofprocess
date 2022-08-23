const constants = require('../utils/constants');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

module.exports = (app) => {

    // Verificacion de datos y generacion de JWT
    app.get("/authenticate", async(req, res) => {

        var user = req.body;
        console.log(user);

        // Invocacion a route usuario/:usuario/:contraseña
        const url = `http://localhost:1010/usuario/${user.usuario}/${user.contraseña}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const data = jsonResponse.data[0];

        // Verificacion de datos obtenidos en data (BD) y en user (datos de request.body)
        if (data != undefined && data.usuario === user.usuario && data.contraseña === user.contraseña) {
            var token = jwt.sign(user, constants.JWT_Secret);
            res.status(200).json({
                status: 1,
                data: {
                    signed_user: data,
                    token: token
                },
                message: ""
            });
        } else {
            res.status(403).json({
                status: 0,
                data: data,
                message: 'Authorization required!'
            });
        }

    });

}