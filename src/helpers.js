const prompt = require("./prompts");
const queries = require("./queries");

// ENABLE DELETION BY ELIMINATING DEPENDENCIES (DEPARTMENTS->ROLES->EMPLOYEES & MANAGER->EMPLOYEE)

class helpers {
  static mainMenu() {
    return prompt.mainMenu();
  }
  static async viewDepartments() {
    console.table(await queries.getDepartments());
  }
  static async viewRoles() {
    console.table(await queries.getRoles());
  }
  static async viewEmployees() {
    console.table(await queries.getEmployees());
  }
  static async addDepartment() {
    const { name } = await prompt.departmentPrompt();
    await queries.addDepartment(name);
    console.log(`Added department: ${name}`);
  }
  static async addRole() {
    const departments = await queries.getDepartments();
    const { title, salary, department_id } = await prompt.rolePrompt(
      departments.map((dept) => ({ name: dept.name, value: dept.id }))
    );
    await queries.addRole(title, salary, department_id);
    console.log(`Added role: ${title}`);
  }
  static async addEmployee() {
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
    await queries.updateEmployeeRole(employee_id, newRoleId);
    console.log(`Updated employee's role`);
  }
  static async updateManager() {
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
    await queries.updateEmployeeManager(empId, mgrId);
    console.log(`Updated employee's manager`);
  }
  static async viewEmployeesByManager() {
    const managers = await queries.getEmployees();
    const { manager_id: viewMgrId } = await prompt.viewEmployeesByManagerPrompt(
      managers.map((mgr) => ({
        name: `${mgr.first_name} ${mgr.last_name}`,
        value: mgr.id,
      }))
    );
    console.table(await queries.viewEmployeesByManager(viewMgrId));
  }
  static async viewEmployeesByDepartment() {
    const departmentsForView = await queries.getDepartments();
    const { department_id: viewDeptId } =
      await prompt.viewEmployeesByDepartmentPrompt(
        departmentsForView.map((dept) => ({
          name: dept.name,
          value: dept.id,
        }))
      );
    console.table(await queries.viewEmployeesByDepartment(viewDeptId));
  }
  static async deleteDepartment() {
    const departmentsForDelete = await queries.getDepartments();
    const { department_id: delDeptId } = await prompt.deleteDepartmentPrompt(
      departmentsForDelete.map((dept) => ({
        name: dept.name,
        value: dept.id,
      }))
    );

    const employeesForDelete = await queries.viewEmployeesByDepartment(delDeptId);
    employeesForDelete.forEach( async (delEmp) => {
      const employeesSuboordinate = await queries.viewEmployeesByManager(delEmp.id);
      employeesSuboordinate.forEach(
        async (emp) => await queries.updateEmployeeManager(emp.id, null)
      );
      await queries.deleteEmployee(delEmp.id);
    });

    const rolesForDelete = await queries.viewRolesByDepartment(delDeptId);
    rolesForDelete.forEach(async (delRole) => await queries.deleteRole(delRole.id));

    await queries.deleteDepartment(delDeptId);
    console.log(`Deleted department`);
  }
  static async deleteRole() {
    const rolesForDelete = await queries.getRoles();
    const { role_id: delRoleId } = await prompt.deleteRolePrompt(
      rolesForDelete.map((role) => ({ name: role.title, value: role.id }))
    );

    const employeesForDelete = await queries.viewEmployeesByRole(delRoleId);
    employeesForDelete.forEach( async (delEmp) => {
      const employeesSuboordinate = await queries.viewEmployeesByManager(delEmp.id);
      employeesSuboordinate.forEach( async (emp) => await queries.updateEmployeeManager(emp.id, null));
      await queries.deleteEmployee(delEmp.id);
    });

    await queries.deleteRole(delRoleId);
    console.log(`Deleted role`);
  }
  static async deleteEmployee() {
    const employeesForDelete = await queries.getEmployees();
    const { employee_id: delEmpId } = await prompt.deleteEmployeePrompt(
      employeesForDelete.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
      }))
    );

    const employeesSuboordinate = await queries.viewEmployeesByManager(delEmpId);
    employeesSuboordinate.forEach(async (emp) => await queries.updateEmployeeManager(emp.id, null));

    await queries.deleteEmployee(delEmpId);
    console.log(`Deleted employee`);
  }
  static async viewTotalDepartmentBudget() {
    const departmentsForBudget = await queries.getDepartments();
    const { department_id: budgetDeptId } =
      await prompt.viewTotalUtilizedBudgetPrompt(
        departmentsForBudget.map((dept) => ({
          name: dept.name,
          value: dept.id,
        }))
      );
    console.table(await queries.viewTotalUtilizedBudget(budgetDeptId));
  }
};

module.exports = helpers;