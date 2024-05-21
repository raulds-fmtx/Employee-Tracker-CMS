const inquirer = require("inquirer");

class prompts { 
  static mainMenu() {
    return inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update employee manager",
          "View employees by manager",
          "View employees by department",
          "Delete department",
          "Delete role",
          "Delete employee",
          "View total utilized budget of a department",
          "Exit",
        ],
      },
    ]);
  }

  static departmentPrompt() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ]);
  }

  static rolePrompt(departments) {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the role:",
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the department for the role:",
        choices: departments,
      },
    ]);
  }

  static employeePrompt(roles, managers) {
    return inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee:",
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the role of the employee:",
        choices: roles,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the manager of the employee:",
        choices: managers,
      },
    ]);
  }

  static updateEmployeeRolePrompt(employees, roles) {
    return inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Select the employee to update:",
        choices: employees,
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the new role of the employee:",
        choices: roles,
      },
    ]);
  }

  static updateEmployeeManagerPrompt(employees, managers) {
    return inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Select the employee to update:",
        choices: employees,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the new manager of the employee:",
        choices: managers,
      },
    ]);
  }

  static viewEmployeesByManagerPrompt(managers) {
    return inquirer.prompt([
      {
        type: "list",
        name: "manager_id",
        message: "Select the manager to view their employees:",
        choices: managers,
      },
    ]);
  }

  static viewEmployeesByDepartmentPrompt(departments) {
    return inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message: "Select the department to view its employees:",
        choices: departments,
      },
    ]);
  }

  static deleteDepartmentPrompt(departments) {
    return inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message: "Select the department to delete:",
        choices: departments,
      },
    ]);
  }

  static deleteRolePrompt(roles) {
    return inquirer.prompt([
      {
        type: "list",
        name: "role_id",
        message: "Select the role to delete:",
        choices: roles,
      },
    ]);
  }

  static deleteEmployeePrompt(employees) {
    return inquirer.prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Select the employee to delete:",
        choices: employees,
      },
    ]);
  }

  static viewTotalUtilizedBudgetPrompt(departments) {
    return inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message: "Select the department to view its total utilized budget:",
        choices: departments,
      },
    ]);
  }
}

module.exports = prompts;
