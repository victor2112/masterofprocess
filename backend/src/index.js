const app = require('./config/server');

const conn = require("./config/database");

require('./app/routes/authentication')(app);
require('./app/routes/usuario')(app);
require('./app/routes/processes')(app);
require('./app/routes/instances')(app);
require('./app/routes/forms')(app);
require('./app/routes/fields')(app);
require('./app/routes/lists')(app);

app.listen(app.get("PORT"), () => console.log(`Servidor corriendo en puerto ${app.get("PORT")}`));