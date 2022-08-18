const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'mineprocess',
    insecureAuth: true
});

conn.connect(err => {
    if (err) {
        throw err;
    }
});

module.exports = conn;