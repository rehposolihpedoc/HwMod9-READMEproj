 
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under



// TODO: Include packages needed for this application
const fs = require("fs/promises");
const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
// TODO: Create an array of questions for user input

const promptUser = async () => {
  var answers = await inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of your project:",
      name: "title",
    },
    {
      type: "input",
      message: "Enter a description:",
      name: "description",
      },
    {
      type: "input",
      message: "Enter installation instructions:",
      name: "installation",
    },
    {
      type: "list",
      message: "Enter license information:",
      choices: ["MIT", "Apache", "None", "Boost", "BSD"],
      name: "license",
      validate: licenseList = () => {
        const licenceChoice = answers[3].choices.value 
      }
      
    },
    {
      type: "input",
      message: "Enter usage information",
      name: "usage",
    },
    {
      type: "input",
      message: "Enter contribution guidelines:",
      name: "contribution",
    },
    {
      type: "input",
      message: "Enter testing information:",
      name: "testing",
    },
    {
      type: "input",
      message: "Enter further questions:",
      name: "questions",
    },
    {
      type: "input",
      message: "Please enter your GitHub UserName",
      name: "username",
    },
    {
      type: "input",
      message: "Enter you email address please",
      name: "email",
    },
  ]);
  return answers;
};

function getLicenseBadge (licenceChoice){
    var licenceBadge = ""
    //depending on what the user gets
    licenceBadge = ['![Boost License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)', '![Apache OpenSource License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)', '![BSD Opensource License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)', '![BSD 2 License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)', '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)']
    if (licenceChoice == "boost") {
        return licenceBadge[0]
    } 
    if (licenceChoice == "MIT") {
        return licenceBadge[4]
    } 
    if (licenceChoice == "Apache") {
        return licenceBadge[1]
    } 
    if (licenceChoice == "BSD") {
        return licenceBadge[2]
    } 
    if (licenceChoice == "None") {
        return []
    } 
    
    return licenceBadge
}

const generateReadme = (Responses) =>
  `
## ${Responses.title} 

## DESCRIPTION
Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
- What problem does it solve?
- What did you learn?
${Responses.description}



## Table of Contents:

- [License](#license)
- [Installation](#installation)
- [usage](#usage)
- [Contribution](#contribution)
- [Testing](#testing)
- [Question](#questions)
- [UserName](#username)
- [Email](#email)

## LICENSE
${getLicenseBadge(Responses.license)}



## INSTALLATION 
What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.
${Responses.installation} 



## USAGE
Provide instructions and examples for use. Include screenshots as needed.

To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    '''md
    ![alt text](assets/images/screenshot.png)
  
${Responses.usage}



## List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

${Responses.contribution}



##  Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.
${Responses.testing}



## QUESTIONS FOR FUTURE DEVELOPMENT
${Responses.questions}



## GITHUB 
Here is my username @ GitHub ${Responses.username}.
My profile link is https://github.com/rehposolihpedoc



## CONTACT INFORMATION
You can reach me at ${Responses.email} if you are interested in learning more about this project or future collaborations. 
`;

const writeReadme = async (Responses) => {
  try {
    await fs.writeFile("CustomREADME.md", generateReadme(Responses));
    console.log("README.md file generated successfully!");
  } catch (err) {
    console.error(err);
  }
};



// TODO: Create a function to initialize app
async function init() {
  const returnResponse = await promptUser();
  console.log("====== responses =====");
  console.log(returnResponse);
  writeReadme(returnResponse);
}

// Function call to initialize app
init();
