const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the empoyee_db database.`)
  );

  const questions = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'exit'], 
    }
]

function init() {
    db.connect();
    getUserChoice();
}

function getUserChoice(){
    inquirer
    .prompt(
        questions
    )
    .then((response) =>
        showResults(response),
        //console.log(response.choice),
    )
}

function showResults(response){
    const selectedChoice = response.choice;
    console.log("Selected Choice: " + selectedChoice);

    if (selectedChoice == "View all departments"){
        viewAllDepartments();
        getUserChoice();
    }

    if(selectedChoice == "View all roles"){
        viewAllRoles();
        getUserChoice();
    }

    if(selectedChoice == "View all employees"){
        viewAllEmployees();
        getUserChoice();
    }

    if(selectedChoice == "Add a department"){
        addDepartment();
    }

    if(selectedChoice == "Add a role"){
        addRole();
    }

    if(selectedChoice == "Add an employee"){
        addEmployee();
    }

    if(selectedChoice == 'exit'){
        db.end();
    }    
}

function viewAllDepartments(){

    const sql =   `SELECT id as department_id, name as department_name FROM department`; 
    console.log(sql);
    showQueryResult(sql);
}

function viewAllRoles(){
    const sql = `SELECT role.id, role.title, department.name, role.salary
    FROM role
    JOIN department
    ON role.department_id = department.id`; 
    console.log(sql);
    showQueryResult(sql);
}

function viewAllEmployees(){
    const sql = `SELECT e.id as 'Employee ID', concat(e.first_name, ' ', e.last_name) as 'Employee Name', role.title as Role, role.salary as Salary, department.name as Department, concat(m.first_name, ' ', m.last_name) as Manager
    FROM employee e
    LEFT JOIN employee m
    ON e.manager_id = m.id
    JOIN role
    ON e.role_id = role.id
    JOIN department
    ON role.department_id = department.id`;
    console.log(sql);
    showQueryResult(sql);
}

function showQueryResult(sql){
    db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(['', ''], result);
    });
}

function addDepartment(){
    inquirer
    .prompt(
        {
            type: 'input',
            message: 'Enter department name',
            name: 'department_name'
        },
    )
    .then((response) =>
        insertDepartmentName(response)
    )
}

function insertDepartmentName(response){
    const sql = `INSERT INTO department (name)
    VALUES ("${response.department_name}")`; 
    showQueryResult(sql);
    getUserChoice();
}

// Function call to initialize app
init();
