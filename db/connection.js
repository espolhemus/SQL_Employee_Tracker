const mysql2 = require('mysql2');
({multipleStatements: true})

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'employees_db',
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;