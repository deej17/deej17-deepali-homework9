const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt({
        message: "Enter your GitHub username:",
        name: "username",
        type: "input",
    })
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function (res) {
            // console.log(res.data);

            // Get Username
            const username = res.data.login;

            // Get Avatar Image
            const avatarURL = res.data.avatar_url;
            const avatar = '![Avatar](' + avatarURL + ')';

            // Get Email
            const email = res.data.email;

            let document =
                // Avatar
                '# Good README Generator \n \n' +
                avatar + '\n \n' +
                // Usermame
                'Your usrname is: ' + username + '\n \n' +
                // Email
                'Your mail is: ' + email + '\n';

            fs.writeFile("README.md", document, function (err) {
                if (err) {
                    throw err;
                }
            });
        })

            .then(function () {
                inquirer.prompt([
                    {
                        message: "What is your badge version? ",
                        name: "badge",
                        type: "input"
                    },
                    {
                        message: "What is the project title? ",
                        name: "project",
                        type: "input"
                    },
                    {
                        message: "What is your project description? ",
                        name: "description",
                        type: "input"
                    },
                    {
                        message: "What are the table of contents? ",
                        name: "table",
                        type: "input"
                    },
                    {
                        message: "What is the installation? ",
                        name: "install",
                        type: "input"
                    },
                    {
                        message: "What is the usage? ",
                        name: "usage",
                        type: "input"
                    },
                    {
                        message: "What is the license number? ",
                        name: "license",
                        type: "input"
                    },
                    {
                        message: "Who is contributing? ",
                        name: "contribute",
                        type: "input"
                    },
                    {
                        message: "What are the required tests? ",
                        name: "test",
                        type: "input"
                    },
                ])
                    .then(function (answers) {
                        console.log("this is inside the third nested .then");

                        let userQs =
                            // Prompt second set of questions
                            `## Second Set of Questions  \n \n`

                        let body2 =
                            `![bage image](https://img.shields.io/static/v1?label=Version&message=${answers.badge}&color=<COLOR>) \n
                            * Project Title \n \n ${answers.project} \n \n
                            * Project Description \n \n ${answers.description} \n \n
                            * Table of Content \n \n ${answers.table} \n \n
                            * Installation Details \n \n ${answers.install} \n \n
                            * Usage Details \n \n ${answers.usage} \n \n
                            * License Details \n \n ${answers.license} \n \n
                            * Contribution \n \n ${answers.contribute} \n \n
                            * Tests Required \n \n ${answers.test} \n \n 
                            * GIF File yes \n \n ![bage image](./StepwiseCLI.gif) `;

                        var document = userQs.concat('\n', body2);
                        fs.appendFile("README.md", document, function (err) {
                            if (err) {
                                throw err;
                            }
                        })
                    })
            })
    })
