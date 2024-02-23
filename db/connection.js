const mysql2 = require('mysql2');
({multipleStatements: true})

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    multipleStatements: true
    // database: 'employees_db'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;