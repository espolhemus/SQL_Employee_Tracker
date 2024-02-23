// rundb.js

const fs = require('fs');
const mysql = require('mysql2');

// Require connection.js
connection = require('./db/connection.js');

// Read schema.sql and seeds.sql files
// const schemaSQL = fs.readFileSync('./db/schema.sql', 'utf8');
const schemaSQL = fs.readFileSync('./db/schema.sql', 'utf8');
const seedSQL = fs.readFileSync('./db/seed.sql', 'utf8');

// Create a new MySQL connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_username',
//     password: 'your_password',
//     database: 'your_database'
// });

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');

    // Execute schema.sql
    connection.query(schemaSQL, (err, results) => {
        if (err) throw err;
        console.log('Schema executed successfully.');

        // Execute seeds.sql
        connection.query(seedSQL, (err, results) => {
            if (err) throw err;
            console.log('Seeds executed successfully.');

            // Close the connection
            connection.end((err) => {
                if (err) throw err;
                console.log('Connection closed.');
            });
        });
    });
});