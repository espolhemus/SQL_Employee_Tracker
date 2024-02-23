use employees_db;

INSERT INTO departments
    (dept_name)
VALUES
('Engineering'),
('Marketing'),
('Finance'),
('Sales'),
('Human Resources');

INSERT INTO roles
    (title, salary, department_id) 
VALUES
('Software Engineer', 80000, 1),
('Marketing Specialist', 60000, 2),
('Financial Analyst', 70000, 3),
('Sales Manager', 90000, 4),
('HR Coordinator', 55000, 5),
('Senior Software Engineer', 95000, 1),
('Marketing Manager', 75000, 2),
('Finance Director', 100000, 3),
('Sales Associate', 60000, 4),
('HR Manager', 80000, 5);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, 1),
('Emily', 'Brown', 4, 2),
('David', 'Williams', 5, 2),
('Sarah', 'Jones', 6, 3),
('Alex', 'Davis', 7, 3),
('Jessica', 'Martinez', 8, 4),
('Kevin', 'Garcia', 9, 4),
('Laura', 'Rodriguez', 10, 5),
('Mark', 'Hernandez', 1, 6),
('Amanda', 'Lopez', 2, 6),
('Chris', 'Gonzalez', 3, 7),
('Stephanie', 'Perez', 4, 7),
('Ryan', 'Torres', 5, 8),
('Nicole', 'Flores', 6, 8),
('Brandon', 'Ramirez', 7, 9),
('Kimberly', 'Sanchez', 8, 9),
('Tyler', 'Nguyen', 9, 10),
('Megan', 'Lee', 10, 10);