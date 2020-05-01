const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require ("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const employeeDetails = [{
        type: "input",
        message: "What is your Team member's name:",
        name: "name",
        validate: (input) => {
        if (/[a-z\s\-]+/gi.test(input.trim()) === true) {
            return true;
        }
        return "Please enter a valid name";
        },
        filter: (input) => input.trim ()
    },
    {
        type: "input",
        message: "What is your Team member's Id:",
        name: "id",
        validate: (input) => {
            if (/^[0-9]+$/gi.test(input.trim()) === true) {
                return true;
            }
            return "Please enter a valid number";
        },
        filter: (input) => input.trim()
    },
    {
        type: "input",
        message: "What is your Team member's Email address:",
        name: "email",
        validate: (character) => {
            const emailFilter = character.match (/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/);
            if (emailFilter) {
              return true;
            } else {
              return "Please enter the correct email address";
            }
        }
    }];

    const managerDetails = [{
            type: "input",
            message: "What is your Manager's office number:",
            name: "officeNum",
            validate: (input) => {
                if (/^[0-9]+$/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid number";
            },
            filter: (input) => input.trim()
    }];

    const engineerDetails = [{
            type: "input",
            message: "What is Engineer's GitHub username:",
            name: "github",
            validate: (input) => {
                if (/.\S+/gi.test(input.trim()) === true) {
                    return true;
                }
                return "Please enter a valid username";
            },
            filter: (input) => input.trim()
    }];

    const internDetails = [{
            type: "input",
            message: "What is your Intern's school:",
            name: "school",
            validate: (input) => {
                if (/[a-z\s\-]+/gi.test(input.trim()) === true) {
                    return true;
                }
                return 'Please enter a valid school name';
            },
            filter: (input) => input.trim()
    }];

    let allDetails = [];
    const manager = [];
    const engineers = [];
    const interns = [];

    function getRole() {
        inquirer.prompt (
            {
                type: "list",
                message: "What type of Team member would you like to add:",
                name: "title",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "I don't want to add a Team member anymore"
                ],
            }
        ).then((data) => {
            console.log(data.title)
            if (data.title === "I don't want to add a Team member anymore") {
                renderHTML();
            }
            else if (data.title === "Manager") {
                allDetails = [...employeeDetails, ...managerDetails];
                getData(data.title);
            }
            else if (data.title === "Engineer") {
                allDetails = [...employeeDetails, ...engineerDetails];
                getData(data.title);
            }
            else if (data.title === "Intern") {
                allDetails = [...employeeDetails, ...internDetails];
                getData(data.title);
            }
        });        
    }

    function getData(title) {
        inquirer.prompt(allDetails).then((data) => {
            const {name, id, email, officeNum, github, school} = data;
            switch (title) {
                case "Manager":
                manager.push(new Manager(name, id, email, officeNum));
                break;
            case "Engineer":
                engineers.push(new Engineer(name, id, email, github));
                break;
            case "Intern":
                interns.push(new Intern(name, id, email, school));
                break;
            }
            console.log("================================");
            console.log(manager);
            console.log(engineers);
            console.log(interns);
            getRole();
        });
    }

    async function renderHTML() {
        console.log("rendering HTML");
        try {
            const employees = [...manager, ...engineers, ...interns];
            console.log("================================");
            console.log(employees)
            const htmlcontent = await render(employees);
            fs.writeFile("output/team.html", htmlcontent, err => {
                if (err) {
                    return console.log(err);
                }
                console.log("HTML file created successfully");
            });
        }
        catch (err) {
            console.log("Something went wrong in creating HTML file");
        }
    }

    getRole();



























// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
