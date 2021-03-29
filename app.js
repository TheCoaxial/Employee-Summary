const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

    const empIDs = [];
    const team = [];

function app() {

    function newManager(){
        console.log("Let's build a team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the manager's ID?"
            },
            {
                type: "input",
                name: "managerOfficeNum",
                message: "What is your manager's office number?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's Email?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum);
            empIDs.push(answers.managerId);
            team.push(manager);
            displayTeam();
        });
    }

    function displayTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "job",
                message: "What role do you want to add to your team?",
                choices: [ 
                    "Intern",
                    "Engineer",
                    "Finished"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.job) {
                case "Engineer":
                    newEngineer();
                    break;
                case "Intern":
                    newIntern();
                    break;
                default:
                    compileTeam();
                }
            });
        }
    
    function newIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "what is the intern's name?"
            },
            {
                type: "input",
                name: "internID",
                message: "Please enter Interns' ID",
            },
            {
                type: "input",
                name: "School",
                message: "Which school does your intern attend?"
            }
        ]).then(answers =>{
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.interSchool);
            team.push(intern);
            empIDs.push(answers.internID);
            displayTeam();
        });
    }

        function newEngineer() {
            inquirer.prompt([
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is the engineer's name?",
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is the engineer's id?",
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is the engineer's email?",
                },
                {
                    type: "input",
                    name: "engineerGithub",
                    message: "What is the engineer's GitHub username?",
                }
            ]).then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                team.push(engineer);
                empIDs.push(answers.engineerId);
                displayTeam();
            })
        }
   

    function compileTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
          fs.writeFileSync(outputPath, render(team), "utf-8");
    }

    newManager();
}

app();






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
