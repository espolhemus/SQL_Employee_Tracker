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
// require('./db/connection.js');

function startPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userAction',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Eemployee',
                'Update an Employee Role'
            ]
        }
    ]).then(function (answer) {
        switch (answer.userAction) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
        }
    });
}
// Start inquirer prompts

// Prompt user to select an action

// View all departments
function viewDepartments() {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

// View all roles
function viewRoles() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

// View all employees
function viewEmployees() {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}

// Add a department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the new department?'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO departments SET ?', { dept_name: answer.newDepartment }, function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        });
    });
}

// Add a role

function addRole() {
    // Create a function to get the departments
    function getDepartments() {
        return new Promise(function (resolve, reject) {
            connection.query('SELECT * FROM departments', function (err, res) {
                if (err) throw err;
                resolve(res);
            });
        });
    }
    // Call the function to get the departments
    getDepartments().then(function (departments) {
        const deptChoices = departments.map(function (department) {
            return {
                name: departments.dept_name,
                value: departments.id
            };
        });
        // promptRole(deptChoices);
    });    
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the Title for this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role'
        },
        {
            type: 'list',
            name: 'departmentID',
            message: 'Enter the department ID for this role',
            choices: deptChoices
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO roles SET ?', { title: answer.newRole, salary: answer.salary, department_id: answer.departmentID }, function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        });
    });
}

// Add an employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee'
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'Enter the role ID for this employee'
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'Enter the manager ID for this employee'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO employee SET ?', { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleID, manager_id: answer.managerID }, function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        });
    });
}

// Update an employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'Enter the employee ID'
        },
        {
            type: 'input',
            name: 'newRoleID',
            message: 'Enter the new role ID'
        }
    ]).then(function (answer) {
        connection.query('UPDATE employee SET ? WHERE ?', [{ role_id: answer.newRoleID }, { id: answer.employeeID }], function (err, res) {
            if (err) throw err;
            console.table(res);
            startPrompt();
        });
    });
}

// Start the prompt
startPrompt();