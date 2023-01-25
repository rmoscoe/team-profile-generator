const fs = require("fs");
const inquirer = require("inquirer");
const employees = [];

//Questions arrays for the inquirer prompts
const questionsManager = [{
    name: "name",
    message: "Please enter the manager's name.",
    validate: (input) => {
        if (/^[A-Za-z\s\-]+$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter a valid name consisting of one or more letters, spaces, and hyphens."
        }
    }
}, {
    name: "id",
    message: "Please enter the manager's ID.",
    validate: (input) => {
        if (/^[0-9A-Za-z]+$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter a valid ID number consisting of numbers and letters."
        }
    }
}, {
    name: "email",
    message: "Please enter the manager's email address.",
    validate: function (answer) {
        const valid = /^[\w]+[\w-\.!#$%^&*?<>]*@([\w-]+\.)+[\w-]{2,4}$/;
        if (valid.test(answer.trim())) {
            return true;
        } else {
            return "Please enter a valid email address.";
        }
    }
}, {
    name: "officeNumber",
    message: "Please enter the manager's office number.",
    validate: (input) => {
        if (/^[\d]+$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter only numeric characters."
        }
    }
}, {
    type: "list",
    name: "continue",
    message: "Would you like to add another team member?",
    choices: ["Yes", "No"]
}];

const questionsEmployee = [{
    type: "list",
    name: "role",
    message: "What is this employee's role?",
    choices: ["Engineer", "Intern"]
}, {
    name: "name",
    message: "Please enter the employee's name.",
    validate: (input) => {
        if (/^[A-Za-z\s\-]+$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter a valid name consisting of one or more letters, spaces, and hyphens."
        }
    }
}, {
    name: "id",
    message: "Please enter the employee's ID.",
    validate: (input) => {
        if (/^[0-9A-Za-z]+$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter a valid ID number consisting of numbers and letters."
        }
    }
}, {
    name: "email",
    message: "Please enter the employee's email address.",
    validate: function (answer) {
        const valid = /^[\w]+[\w-\.!#$%^&*?<>]*@([\w-]+\.)+[\w-]{2,4}$/;
        if (valid.test(answer.trim())) {
            return true;
        } else {
            return "Please enter a valid email address.";
        }
    }
}, {
    name: "github",
    message: "What is the engineer's GitHub username?",
    validate: (input) => {
        if (/^[A-Za-z0-9]{1}[A-Za-z0-9\-]{0,38}$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter a valid GitHub username, including only letters, numbers, and hyphens."
        }
    },
    when: (input) => input.role === "Engineer"
}, {
    name: "school",
    message: "What school does this intern attend?",
    validate: (input) => {
        if (/^[A-Za-z\.\-\s]+$/.test(input.trim())) {
            return true;
        } else {
            return "Please enter the name of the intern's school. Letters, spaces, '.', and '-' are valid characters.";
        }
    },
    when: (input) => input.role === "Intern"
}, {
    type: "list",
    name: "continue",
    message: "Would you like to add another team member?",
    choices: ["Yes", "No"]
}];

//Classes for Employee, Manager, Engineer, and Intern

//Function to write the html file

//Function to create the html string

//Function to build employee objects and push to the employees array


//Functions to prompt the user for input
function promptManager() {
    inquirer.prompt(questionsManager)
        .then((answers) => {
            buildEmployee(answers);
            if (answers.continue) {
                promptEmployee();
            } else {
                buildHTMLString();
            }
        })
        .catch((err) => {
            if (err.isTtyError) {
                console.log("The prompts couldn't be rendered in the current environment.");
            } else {
                console.log(err);
            }
        });
}

//Call function to prompt the user for input
promptManager();

//Exports
module.exports = {Employee, Manager, Engineer, Intern};