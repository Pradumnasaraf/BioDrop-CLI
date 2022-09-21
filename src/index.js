const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const createUser = require("./util/createUser");
const checkUser = require("./util/checkUser");
const { questions, addlinks } = require("./util/questions");

console.log(
  chalk.bgBlue.bold(
    ` Welcome to LinkFree CLI! Let's get started by creating your JSON file. `
  )
);

init();

function init() {
  prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub username? (case sensitive)",
    },
  ])
    .then((answers) => {
      const { githubUsername } = answers;
      if (githubUsername === "") {
        console.log(
          chalk.bgRed.bold(` Please enter a valid GitHub username. `)
        );
        init();
      } else if (fs.existsSync(`./public/data/${githubUsername}.json`)) {
        console.log(
          chalk.bgYellow.bold(` File ${githubUsername}.json already exists!`)
        );
        prompt([
          {
            type: "confirm",
            name: "overwrite",
            message: "Do you want to overwrite the existing file?",
          },
        ]).then((answers) => {
          const { overwrite } = answers;
          if (overwrite) {
            console.log(
              chalk.bgGreen.bold(` Proceed with overwriting file... `)
            );
            start(githubUsername);
          } else {
            console.log(chalk.bgRed.bold(` File not overwritten! `));
            console.log("Restart the program to try again.");
            process.exit(0);
          }
        });
      } else {
        start(githubUsername);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

let json;
function start(githubUsername) {
  checkUser(githubUsername).then((result) => {
    if (result === true) {
      questions().then((answers) => {
        json = answers;
        prompt([
          {
            type: "confirm",
            name: "addLink",
            message: "Do you want to add a link to your profile?",
          },
        ])
          .then((addLink) => {
            if (addLink) {
              addlinks().then((links) => {
                json.links = links;
                createUser(githubUsername, json);
              });
            } else {
              createUser(githubUsername, json);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      console.log(
        chalk.bgRed.bold(
          ` User with username '${githubUsername}' does not exist on GitHub, try again! `
        )
      );
      init();
    }
  });
}
