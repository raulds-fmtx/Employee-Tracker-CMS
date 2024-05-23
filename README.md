# Employee-Tracker-CMS

![License](https://img.shields.io/static/v1?label=license&message=MIT&color=yellowgreen) 
    
An employee tracking node application that uses inquirer.js to gather user input and store information about employees, roles, and departments within an organization using postgresql.
    
## Table of Contents
    
* [Installation](#Installation)
    
* [Usage](#Usage)
    
* [License](#License)
    
* [Author](#Author)
    
## Installation
    
To access the employee database, first enter Git Bash. Then clone the repository with the following link
[Employee Tracker CMS](https://github.com/raulds-fmtx/Employee-Tracker-CMS.git)

Next, enter the repository's cloned directoyr and run `npm install inquirer` in an integrated terminal. This will install the required npm packagse dpendencies in your cloned directory.

In the [`query.js`](./db/query.js) file, change the `user` field to your postgres username and the `password` field to your postgres password.
    
## Usage

Prior to running the Employee Tracker for the first time, run the command `psql -U username`, replacing 'username' with your postgres username, from an integrated terminal. Next, enter your postgres password. Upon connecting to postgres, run the command `\i ./db/schema.sql`. This will create and format the `employee_db` used by the program.

Optionally, you made seed the database with initial values by running the command `\i ./db/seed.sql`. You may also modify the `seed.sql` document to conform with the needs of your organization. Any added departments, roles, and employees may be updated or deleted upon running the employee tracker.

To run the program, run the command `node index.js` in an integrated terminal. You will be prompted by inquirer to select from several options as listed below:

* View all departments
* View all roles
* View all employees
* Add a department
* Add a role
* Add an employee
* Update an employee role
* Update employee manager
* Delete department
* Delete role
* Delete employee
* View total utilized budget of a department
* Exit

With these options you can view, add, update, and delete departments, roles, and employees. 

To exit the application select the `Exit` option in the inquirer main menu prompt.

[Click Here to View a Demo.](https://drive.google.com/file/d/1Q1CueumHNMy-g9UrAy5TSPJIWiPCZel6/view?usp=sharing)

## License
    
This project is license under the MIT License - see the [License](https://choosealicense.com/licenses/mit/)
    
## Author
    
Raul Santos
    
Github: [raulds-fmtx](https://github.com/raulds-fmtx)

Repo: [Note-Taking-Web-App](https://github.com/raulds-fmtx/Employee-Tracker-CMS)