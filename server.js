// require Inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const consoleTable = require('console.table');
const connection = require('./db/connection');

// Connect to database
// Write a function to test the connection to the database and console log the results
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log('Connected to the mySQL database.');
//     // startPrompt();
// });

// Require connection.js
require('./db/connection.js');

// Require schema.js
require('./db/schema.js');

// Require seeds.js
require('./db/seeds.js');

// Start inquirer prompts

// Prompt user to select an action

// View all departments

// View all roles

// View all employees

// Add a department

// Add a role

// Add an employee

// Update an employee role