#! /usr/bin/env node

const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const createUser = require("./util/createUser");

function questions() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is your GitHub username (Case Sensitive)?",
    },
  ])
    .then((answers) => {
      const GHUsername = answers.name;
      if (fs.existsSync(`./public/data/${GHUsername}.json`)) {
        console.log(
          chalk.bgYellow.bold(
            ` File with ${answers.name}.json already exists, try again! `
          )
        );
        questions();
      } else {
        prompt([
          {
            type: "input",
            name: "name",
            message: "What is your name?",
          },
          {
            type: "select",
            name: "type",
            message: "Your profile type?",
            choices: ["Personal", "Community"],
          },
          {
            type: "input",
            name: "bio",
            message: "Add a short bio about yourself",
          },
        ])
          .then((answers) => {
            createUser(GHUsername, answers);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

questions();
