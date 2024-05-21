const prompt = require("./src/prompts");

const helpers = require("./src/helpers");

const init = async () => {
  let exit = false;
  while (!exit) {
    const { action } = await prompt.mainMenu();
    switch (action) {
      case "View all departments":
        console.table(await helpers.getDepartments());
        break;
      case "View all roles":
        console.table(await helpers.getRoles());
        break;
      case "View all employees":
        console.table(await helpers.getEmployees());
        break;
      case "Add a department":
        const { name } = await prompt.departmentPrompt();
        await helpers.addDepartment(name);
        console.log(`Added department: ${name}`);
        break;
      case "Add a role":
        const departments = await helpers.getDepartments();
        const { title, salary, department_id } = await prompt.rolePrompt(
          departments.map((dept) => ({ name: dept.name, value: dept.id }))
        );
        await helpers.addRole(title, salary, department_id);
        console.log(`Added role: ${title}`);
        break;
      case "Add an employee":
        const roles = await helpers.getRoles();
        const employees = await helpers.getEmployees();
        const { first_name, last_name, role_id, manager_id } =
          await prompt.employeePrompt(
            roles.map((role) => ({ name: role.title, value: role.id })),
            employees.map((emp) => ({
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            }))
          );
        await helpers.addEmployee(first_name, last_name, role_id, manager_id);
        console.log(`Added employee: ${first_name} ${last_name}`);
        break;
      case "Update an employee role":
        const allEmployees = await helpers.getEmployees();
        const allRoles = await helpers.getRoles();
        const { employee_id, role_id: newRoleId } =
          await prompt.updateEmployeeRolePrompt(
            allEmployees.map((emp) => ({
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            })),
            allRoles.map((role) => ({ name: role.title, value: role.id }))
          );
        await helpers.updateEmployeeRole(employee_id, newRoleId);
        console.log(`Updated employee's role`);
        break;
      case "Update employee manager":
        const employeesForManagerUpdate = await helpers.getEmployees();
        const { employee_id: empId, manager_id: mgrId } =
          await prompt.updateEmployeeManagerPrompt(
            employeesForManagerUpdate.map((emp) => ({
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            })),
            employeesForManagerUpdate.map((emp) => ({
              name: `${emp.first_name} ${emp.last_name}`,
              value: emp.id,
            }))
          );
        await helpers.updateEmployeeManager(empId, mgrId);
        console.log(`Updated employee's manager`);
        break;
      case "View employees by manager":
        const managers = await helpers.getEmployees();
        const { manager_id: viewMgrId } = await prompt.viewEmployeesByManagerPrompt(
          managers.map((mgr) => ({
            name: `${mgr.first_name} ${mgr.last_name}`,
            value: mgr.id,
          }))
        );
        console.table(await helpers.viewEmployeesByManager(viewMgrId));
        break;
      case "View employees by department":
        const departmentsForView = await helpers.getDepartments();
        const { department_id: viewDeptId } =
          await prompt.viewEmployeesByDepartmentPrompt(
            departmentsForView.map((dept) => ({
              name: dept.name,
              value: dept.id,
            }))
          );
        console.table(await helpers.viewEmployeesByDepartment(viewDeptId));
        break;
      case "Delete department":
        const departmentsForDelete = await helpers.getDepartments();
        const { department_id: delDeptId } = await prompt.deleteDepartmentPrompt(
          departmentsForDelete.map((dept) => ({
            name: dept.name,
            value: dept.id,
          }))
        );
        await helpers.deleteDepartment(delDeptId);
        console.log(`Deleted department`);
        break;
      case "Delete role":
        const rolesForDelete = await helpers.getRoles();
        const { role_id: delRoleId } = await prompt.deleteRolePrompt(
          rolesForDelete.map((role) => ({ name: role.title, value: role.id }))
        );
        await helpers.deleteRole(delRoleId);
        console.log(`Deleted role`);
        break;
      case "Delete employee":
        const employeesForDelete = await helpers.getEmployees();
        const { employee_id: delEmpId } = await prompt.deleteEmployeePrompt(
          employeesForDelete.map((emp) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
          }))
        );
        await helpers.deleteEmployee(delEmpId);
        console.log(`Deleted employee`);
        break;
      case "View total utilized budget of a department":
        const departmentsForBudget = await helpers.getDepartments();
        const { department_id: budgetDeptId } =
          await prompt.viewTotalUtilizedBudgetPrompt(
            departmentsForBudget.map((dept) => ({
              name: dept.name,
              value: dept.id,
            }))
          );
        console.table(await helpers.viewTotalUtilizedBudget(budgetDeptId));
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
