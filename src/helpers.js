const db = require("../db/queries");

class helpers {
    static async getDepartments() {
        const res = await db.query("SELECT id, name FROM departments");
        return res.rows;
    }
    static async getRoles() {
        const res = await db.query(
            "SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles JOIN departments ON roles.department_id = departments.id"
        );
        return res.rows;
    }
    static async getEmployees() {
        const res =
            await db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name as department, roles.salary, 
                                        (SELECT CONCAT(manager.first_name, ' ', manager.last_name) FROM employees manager WHERE manager.id = employees.manager_id) as manager 
                                        FROM employees 
                                        JOIN roles ON employees.role_id = roles.id 
                                        JOIN departments ON roles.department_id = departments.id`);
        return res.rows;
    }
    static async addDepartment(name) {
        await db.query("INSERT INTO departments (name) VALUES ($1)", [name]);
    }
    static async addRole(title, salary, department_id) {
        await db.query(
            "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)",
            [title, salary, department_id]
        );
    }
    static async addEmployee(first_name, last_name, role_id, manager_id) {
        await db.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
            [first_name, last_name, role_id, manager_id]
        );
    }
    static async updateEmployeeRole(employee_id, role_id) {
        await db.query("UPDATE employees SET role_id = $1 WHERE id = $2", [
            role_id,
            employee_id,
        ]);
    }
    // Bonus queries
    static async updateEmployeeManager(employee_id, manager_id) {
        await db.query("UPDATE employees SET manager_id = $1 WHERE id = $2", [
            manager_id,
            employee_id,
        ]);
    };
    static async viewEmployeesByManager(manager_id) {
        const res = await db.query(
            `SELECT * FROM employees WHERE manager_id = $1`,
            [manager_id]
        );
        return res.rows;
    }
    static async viewEmployeesByDepartment(department_id){
        const res = await db.query(
            `SELECT employees.* FROM employees 
                                            JOIN roles ON employees.role_id = roles.id 
                                            WHERE roles.department_id = $1`,
            [department_id]
        );
        return res.rows;
    }
    static async deleteDepartment(department_id){
        await db.query("DELETE FROM departments WHERE id = $1", [department_id]);
    }
    static async deleteRole(role_id){
        await db.query("DELETE FROM roles WHERE id = $1", [role_id]);
    }
    static async deleteEmployee(employee_id){
        await db.query("DELETE FROM employees WHERE id = $1", [employee_id]);
    }
    static async viewTotalUtilizedBudget(department_id){
        const res = await db.query(
            `SELECT SUM(roles.salary) AS total_budget 
                                            FROM employees 
                                            JOIN roles ON employees.role_id = roles.id 
                                            WHERE roles.department_id = $1`,
            [department_id]
        );
        return res.rows[0];
    }
};

module.exports = helpers;
