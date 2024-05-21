INSERT INTO departments (name) VALUES 
('Engineering'), 
('Finance'), 
('Legal'), 
('Sales');

INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 100000, 1), 
('Accountant', 80000, 2), 
('Lawyer', 120000, 3), 
('Salesperson', 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Michael', 'Johnson', 3, NULL),
('Emily', 'Davis', 4, NULL);