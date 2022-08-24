const app = require('./config/server');

const conn = require("./config/database");

require('./app/routes/authentication')(app);
require('./app/routes/usuario')(app);
require('./app/routes/process')(app);

app.listen(app.get("PORT"), () => console.log(`Servidor corriendo en puerto ${app.get("PORT")}`));