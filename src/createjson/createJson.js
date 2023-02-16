#! /usr/bin/env node

const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const createUser = require("./helper/createUser");
const checkUser = require("./helper/checkUser");
const { questions, addlinks } = require("./helper/questions");
let githubUsername;
let json;

const createJson = () => {
  prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub username? (case sensitive)",
    },
  ])
    .then((answers) => {
      githubUsername = answers.githubUsername;
      if (githubUsername === "") {
        console.log(
          chalk.bgRed.bold(` Please enter a valid GitHub username. `)
        );
        createJson();
      } else if (fs.existsSync(`./data/${githubUsername}.json`)) {
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
};

async function start(githubUsername) {
  await checkUser(githubUsername).then((result) => {
    if (result === true) {
      questions().then((answers) => {
        json = answers;
        prompt([
          {
            type: "confirm",
            name: "addLink",
            message: "Do you want to add a link?",
          },
        ]).then((answers) => {
          const { addLink } = answers;
          if (addLink) {
            addlinkstojson();
          } else {
            createUser(githubUsername, json);
          }
        });
      });
    } else {
      console.log(
        chalk.bgRed.bold(
          ` User with username '${githubUsername}' does not exist on GitHub, try again! `
        )
      );
      createJson();
    }
  });
}

async function addlinkstojson() {
  json.links = await addlinks(true);
  createUser(githubUsername, json);
}

module.exports = createJson;
