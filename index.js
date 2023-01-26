const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

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
    name: "office",
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

//Function to write the html file
function writeHTMLFile (htmlString) {
    fs.writeFile("./dist/myTeam.html", htmlString, (err) => {
        err ? console.log(err) : console.log("File created successfully.");
    });
}

//Function to create the html string
function buildHTMLString() {
    // Base of string
    let htmlString = `<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>My Team</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/eb432245f2.js" crossorigin="anonymous"></script>
</head>

<body>
    <header class="bg-danger p-4 mb-4">
        <h1 class="text-white text-center">My Team</h1>
    </header>

    <main class="container d-flex flex-wrap justify-content-around align-content-around">`;

    // Loop to add a card for each employee
    for (const employee of employees) {
        let icon;
        switch (employee.getRole()) {
            case "Manager":
                icon = "fa-mug-hot";
                htmlString += `<div class="card mb-3" style="width: 18rem;">
                <div class="card-header bg-primary">
                    <h3 class="card-title text-white">${employee.name}</h3>
                    <h4 class="text-white"><span class="fa-solid ${icon} mr-3"></span>${employee.getRole()}</h4>
                </div>
                <div class="card-body bg-light">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: <span>${employee.id}</span></li>
                        <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                        <li class="list-group-item">Office Number: ${employee.officeNumber}</li>
                    </ul>
                </div>
            </div>`;
                break;
            case "Engineer":
                icon = "fa-glasses"
                htmlString += `<div class="card mb-3" style="width: 18rem;">
                <div class="card-header bg-primary">
                    <h3 class="card-title text-white">${employee.name}</h3>
                    <h4 class="text-white"><span class="fa-solid ${icon} mr-3"></span>${employee.getRole()}</h4>
                </div>
                <div class="card-body bg-light">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: <span>${employee.id}</span></li>
                        <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                        <li class="list-group-item">Github: <a href="https://github.com/${employee.github}/">${employee.github}</a></li>
                    </ul>
                </div>
            </div>`;
                break;
            case "Intern":
                icon = "fa-user-graduate";
                htmlString += `<div class="card mb-3" style="width: 18rem;">
                <div class="card-header bg-primary">
                    <h3 class="card-title text-white">${employee.name}</h3>
                    <h4 class="text-white"><span class="fa-solid ${icon} mr-3"></span>${employee.getRole()}</h4>
                </div>
                <div class="card-body bg-light">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: <span>${employee.id}</span></li>
                        <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                        <li class="list-group-item">School: ${employee.school}</li>
                    </ul>
                </div>
            </div>`;
                break;
            default:
                console.error("Error: Something went wrong when adding an employee to the HTML string.");
        }
    }

    // Add the end of the string
    htmlString += `</main>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</body>

</html>`;

    // Call function to write HTML file
    writeHTMLFile(htmlString);
}

//Function to build employee objects and push to the employees array
function buildEmployee(answers) {
    let name, id, email, office, github, school;
    ({ name, id, email, office, github, school, role = "Manager" } = answers);

    name = name.trim()[0].toUpperCase() + name.trim().substring(1);

    switch (role) {
        case "Manager":
            employees.push(new Manager(name, id.trim(), email.trim(), office.trim()));
            break;
        case "Engineer":
            employees.push(new Engineer(name, id.trim(), email.trim(), github.trim()));
            break;
        case "Intern":
            employees.push(new Intern(name, id.trim(), email.trim(), school.trim()));
            break;
        default:
            console.err("Error: This employee's role is undefined.");
    }
}

//Functions to prompt the user for input
function promptManager() {
    inquirer.prompt(questionsManager)
        .then((answers) => {
            buildEmployee(answers);
            if (answers.continue === "Yes") {
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

function promptEmployee() {
    inquirer.prompt(questionsEmployee)
        .then((answers) => {
            buildEmployee(answers);
            if (answers.continue === "Yes") {
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