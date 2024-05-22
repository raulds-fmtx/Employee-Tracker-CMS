const prompt = require("./prompts");
const queries = require("./queries");

// A collection of helper functions to simplify the CLI in index.js
class helpers {
  static mainMenu() {
    // Displays the main menu
    return prompt.mainMenu();
  }
  static async viewDepartments() {
    // Displays a table of all departments
    console.table(await queries.getDepartments());
  }
  static async viewRoles() {
    // Displays a table of all roles
    console.table(await queries.getRoles());
  }
  static async viewEmployees() {
    // Displays a table of all employees
    console.table(await queries.getEmployees());
  }
  static async addDepartment() {
    // Prompts user to add department
    const { name } = await prompt.departmentPrompt();
    await queries.addDepartment(name);
    console.log(`Added department: ${name}`);
  }
  static async addRole() {
    // Prompts user to add role
    const departments = await queries.getDepartments();
    const { title, salary, department_id } = await prompt.rolePrompt(
      departments.map((dept) => ({ name: dept.name, value: dept.id }))
    );
    await queries.addRole(title, salary, department_id);
    console.log(`Added role: ${title}`);
  }
  static async addEmployee() {
    // Prompts user to add employee
    const roles = await queries.getRoles();
    const employees = await queries.getEmployees();
    const { first_name, last_name, role_id, manager_id } =
      await prompt.employeePrompt(
        roles.map((role) => ({ name: role.title, value: role.id })),
        employees.map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        }))
      );
    await queries.addEmployee(first_name, last_name, role_id, manager_id);
    console.log(`Added employee: ${first_name} ${last_name}`);
  }
  static async updateEmployeeRole() {
    // Enables user to update an employee's role
    const allEmployees = await queries.getEmployees();
    const allRoles = await queries.getRoles();
    const { employee_id, role_id: newRoleId } =
      await prompt.updateEmployeeRolePrompt(
        allEmployees.map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        })),
        allRoles.map((role) => ({ name: role.title, value: role.id }))
      );
    // Verifies employees and roles are present
    if (employee_id && newRoleId) {
      await queries.updateEmployeeRole(employee_id, newRoleId);
      console.log(`Updated employee's role`);
    } else {
      console.log('Error: Employee or role not found');
    }
  }
  static async updateManager() {
    // Enables user to update an employee's manager
    const employeesForManagerUpdate = await queries.getEmployees();
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
    // Verifies managers and employees are present
    if (mgrId && empId) {
      await queries.updateEmployeeManager(empId, mgrId);
      console.log(`Updated employee's manager`);
    } else {
      console.log("Error: Manager or employee not found");
    }
  }
  static async viewEmployeesByManager() {
    // Displays table of suboordinates of a given manager
    const managers = await queries.getEmployees();
    const { manager_id: viewMgrId } = await prompt.viewEmployeesByManagerPrompt(
      managers.map((mgr) => ({
        name: `${mgr.first_name} ${mgr.last_name}`,
        value: mgr.id,
      }))
    );
    // Verifies managers are present
    if (viewMgrId) {
      console.table(await queries.viewEmployeesByManager(viewMgrId));
    } else {
      console.log("Error: Manager not found");
    }
  }
  static async viewEmployeesByDepartment() {
    // Displays table of employees within a given department
    const departmentsForView = await queries.getDepartments();
    const { department_id: viewDeptId } =
      await prompt.viewEmployeesByDepartmentPrompt(
        departmentsForView.map((dept) => ({
          name: dept.name,
          value: dept.id,
        }))
      );
    // Verifies departments are present
    if (viewDeptId) {
      console.table(await queries.viewEmployeesByDepartment(viewDeptId));
    } else {
      console.log("Error: Department not found");
    }
  }
  static async deleteDepartment() {
    // Enables user to delete a department and all its roles and employees
    const departmentsForDelete = await queries.getDepartments();
    const { department_id: delDeptId } = await prompt.deleteDepartmentPrompt(
      departmentsForDelete.map((dept) => ({
        name: dept.name,
        value: dept.id,
      }))
    );
    // Deletes a department's employees
    const employeesForDelete = await queries.viewEmployeesByDepartment(delDeptId);
    employeesForDelete.forEach( async (delEmp) => {
      const employeesSuboordinate = await queries.viewEmployeesByManager(delEmp.id);
      employeesSuboordinate.forEach(
        async (emp) => await queries.updateEmployeeManager(emp.id, null)
      );
      await queries.deleteEmployee(delEmp.id);
    });
    // Deletes a department's roles
    const rolesForDelete = await queries.viewRolesByDepartment(delDeptId);
    rolesForDelete.forEach(async (delRole) => await queries.deleteRole(delRole.id));
    // Deletes a deperatment
    if (delDeptId) {
      await queries.deleteDepartment(delDeptId);
      console.log(`Deleted department`);
    } else {
      console.log('Error: Department not found');
    }
  }
  static async deleteRole() {
    // Enables user to delete a role and all its employees
    const rolesForDelete = await queries.getRoles();
    const { role_id: delRoleId } = await prompt.deleteRolePrompt(
      rolesForDelete.map((role) => ({ name: role.title, value: role.id }))
    );
    // Deletes a role's employees
    const employeesForDelete = await queries.viewEmployeesByRole(delRoleId);
    employeesForDelete.forEach( async (delEmp) => {
      const employeesSuboordinate = await queries.viewEmployeesByManager(delEmp.id);
      employeesSuboordinate.forEach( async (emp) => await queries.updateEmployeeManager(emp.id, null));
      await queries.deleteEmployee(delEmp.id);
    });
    // Deletes a role
    if (delRoleId) {
      await queries.deleteRole(delRoleId);
      console.log(`Deleted role`);
    } else {
      console.log('Error: Role not found');
    }
  }
  static async deleteEmployee() {
    // Enables user to delete an employee and de-couples that employee from their suboordinates
    const employeesForDelete = await queries.getEmployees();
    const { employee_id: delEmpId } = await prompt.deleteEmployeePrompt(
      employeesForDelete.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      }))
    );
    // de-couples employee from their suboordinates
    const employeesSuboordinate = await queries.viewEmployeesByManager(delEmpId);
    employeesSuboordinate.forEach(async (emp) => await queries.updateEmployeeManager(emp.id, null));
    // deletes employee
    if (delEmpId) {
      await queries.deleteEmployee(delEmpId);
      console.log(`Deleted employee`);
    } else {
      console.log('Error: Employee not found');
    }
  }
  static async viewTotalDepartmentBudget() {
    // Displays the sum of the salaries of all employees within a department
    const departmentsForBudget = await queries.getDepartments();
    const { department_id: budgetDeptId } =
      await prompt.viewTotalUtilizedBudgetPrompt(
        departmentsForBudget.map((dept) => ({
          name: dept.name,
          value: dept.id,
        }))
      );
    if (budgetDeptId) {
      console.table(await queries.viewTotalUtilizedBudget(budgetDeptId));
    } else {
      console.log('Error: Department not found');
    }
  }
};

module.exports = helpers;