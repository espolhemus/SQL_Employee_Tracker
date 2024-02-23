
const inquirer = require('inquirer');
// Unnecessary since we are using connection.js
// const mysql = require('mysql2');
const connection = require('./db/connection');

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
                'Add an Employee',
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

// View all departments
function viewDepartments() {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        startPrompt();
    });
}

// View all roles
function viewRoles() {
    connection.query(
        'SELECT r.*, d.dept_name ' +
        'FROM roles r ' +
        'LEFT JOIN departments d on r.department_id = d.id',
        function (err, res) {
        if (err) throw err;
        console.log("\n");
        console.table(res);
        console.log("\n");
        startPrompt();
    });
}

// View all employees
function viewEmployees() {
    connection.query(
        'SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name ' +
        'FROM employees e ' +
        'LEFT JOIN roles r ON e.role_id = r.id ' +
        'LEFT JOIN departments d ON r.department_id = d.id ' +
        'LEFT JOIN employees m ON e.manager_id = m.id',
        function (err, res) {
            if (err) throw err;
            console.log("\n");
            console.table(res);
            console.log("\n");
            startPrompt();
        }
    );
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
            console.log("\n")
            console.table(res);
            console.log("\n");
            console.log(`Department ${answer.newDepartment} added successfully.`);
            console.log("\n");
            startPrompt();
        });
    });
}

// Add a role
function addRole() {
    // Create a function to execute a query to get a list of all departments
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;

        // Create an empty array to hold the department choices
        const deptChoices = [];

        // Loop through the response and push the department names and IDs to the deptChoices array
        for (let i = 0; i < res.length; i++) {
            deptChoices.push({ name: res[i].dept_name, value: res[i].id });
        }

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
                console.log("\n");
                console.table(res);
                console.log("\n");
                console.log(`Role ${answer.newRole} added successfully`);
                console.log("\n");
                startPrompt();
            });
        });
    });
}

// Add an employee
function addEmployee() {

    // Create a function to execute a query to get a list of all roles
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        // Create an empty array to hold the department choices
        const roleChoices = [];
        // Loop through the response and push the department names and IDs to the deptChoices array
        for (let i = 0; i < res.length; i++) {
            roleChoices.push({ name: res[i].title, value: res[i].id });
        }

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
            type: 'list',
            name: 'roleID',
            message: 'Enter the role ID for this employee',
            choices: roleChoices
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'Enter the manager ID for this employee'
        }
    ]).then(function (answer) {
        connection.query('INSERT INTO employees SET ?', { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleID, manager_id: answer.managerID }, function (err, res) {
            if (err) throw err;
            console.log("\n")
            console.table(res);
            console.log("\n");
            console.log(`Employee ${answer.firstName} ${answer.lastName} added successfully.`);
            console.log("\n");
            viewEmployees();
            console.log("\n");
            startPrompt();
        });
    });
    });
}

// Update an employee role
function updateEmployeeRole() {

    // Create a function to execute a query to get a list of all employees
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        // Create an empty array to hold the department choices
        const employeeChoices = [];
        // Loop through the response and push the department names and IDs to the deptChoices array
        for (let i = 0; i < res.length; i++) {
            employeeChoices.push({
                name: `${res[i].first_name} ${res[i].last_name}`,
                value: res[i].id });
        }

     // Create a function to execute a query to get a list of all roles
     connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        // Create an empty array to hold the department choices
        const roleChoices = [];
        // Loop through the response and push the department names and IDs to the deptChoices array
        for (let i = 0; i < res.length; i++) {
            roleChoices.push({ name: res[i].title, value: res[i].id });
        }

    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeID',
            message: 'Select the employee to be updated',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRoleID',
            message: 'Enter employees new role',
            choices: roleChoices
        }
    ]).then(function (answer) {
        connection.query('UPDATE employees SET ? WHERE ?', [{ role_id: answer.newRoleID }, { id: answer.employeeID }], function (err, res) {
            if (err) throw err;
            console.log("\n")
            console.table(res);
            console.log("\n");
            console.log(`Employee role updated successfully.`);
            console.log("\n");
            startPrompt();
        });
    });
    });
    });
}

// Start the prompt
startPrompt();