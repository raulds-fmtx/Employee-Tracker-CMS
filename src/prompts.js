const inquirer = require("inquirer");

// ENFORCE NON-NULL ANSWERS AND ANSWER TYPES

// A collection of inquirer prompts
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
        validate: (answer) => {
          if (answer.length < 1) {
            return console.log("A department title is required.");
          }
          return true;
        },
      },
    ]);
  }

  static rolePrompt(departments) {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
        validate: (answer) => {
          if (answer.length < 1) {
            return console.log("A role title is required.");
          }
          return true;
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the role:",
        validate: (answer) => {
          if (isNaN(answer) || answer.length < 1) {
            return console.log("Please enter a valid number")
          }
          return true;
        }
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the department for the role:",
        choices: departments,
        when: departments.length >= 1,
      },
    ]);
  }

  static employeePrompt(roles, managers) {
    return inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee:",
        validate: (answer) => {
          if (answer.length < 1) {
            return console.log("A first name is required.");
          }
          return true;
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee:",
        validate: (answer) => {
          if (answer.length < 1) {
            return console.log("A last name is required.");
          }
          return true;
        },
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the role of the employee:",
        choices: roles,
        when: roles.length >= 1,
      },
      {
        type: "confirm",
        name: "confirm_manager",
        message: "Does this employee have a manager who is already in the database?",
        when: managers.length >= 1,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the manager of the employee:",
        choices: managers,
        when: (answers) => answers.confirm_manager,
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
        when: employees.length >= 1,
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the new role of the employee:",
        choices: roles,
        when: (answers) => answers.employee_id && roles.length >= 1,
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
        when: employees.length >= 1,
      },
      {
        type: "confirm",
        name: "confirm_manager",
        message: "Is this employees new manager currently in the database?",
        choices: employees,
        when: (answers) => answers.employee_id && managers.length >= 1,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the new manager of the employee:",
        choices: managers,
        when: (answers) => answers.confirm_manager,
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
        when: managers.length >= 1,
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
        when: departments.length >= 1,
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
        when: departments.length >= 1,
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
        when: roles.length >= 1,
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
        when: employees.length >= 1,
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
        when: departments.length >= 1,
      },
    ]);
  }
}

module.exports = prompts;
