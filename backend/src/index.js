const app = require('./config/server');

const conn = require("./config/database");

require('./app/routes/comic')(app);
require('./app/routes/usuario')(app);

app.listen(app.get("PORT"), () => console.log(`Servidor corriendo en puerto ${app.get("PORT")}`));