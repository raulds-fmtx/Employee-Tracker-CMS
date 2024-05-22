const helpers = require("./src/helpers");

const init = async () => {
  let exit = false;
  while (!exit) {
    const { action } = await helpers.mainMenu();
    switch (action) {
      case "View all departments":
        await helpers.viewDepartments();
        break;
      case "View all roles":
        await helpers.viewRoles();
        break;
      case "View all employees":
        await helpers.viewEmployees();
        break;
      case "Add a department":
        await helpers.addDepartment();
        break;
      case "Add a role":
        await helpers.addRole();
        break;
      case "Add an employee":
        await helpers.addEmployee();
        break;
      case "Update an employee role":
        await helpers.updateEmployeeRole();
        break;
      case "Update employee manager":
        await helpers.updateManager();
        break;
      case "View employees by manager":
        await helpers.viewEmployeesByManager();
        break;
      case "View employees by department":
        await helpers.viewEmployeesByDepartment();
        break;
      case "Delete department":
        await helpers.deleteDepartment();
        break;
      case "Delete role":
        await helpers.deleteRole();
        break;
      case "Delete employee":
        await helpers.deleteEmployee();
        break;
      case "View total utilized budget of a department":
        await helpers.viewTotalDepartmentBudget();
        break;
      case "Exit":
        exit = true;
        break;
      default:
        console.log(`Invalid action: ${action}`);
        break;
    }
  }
};

init();
