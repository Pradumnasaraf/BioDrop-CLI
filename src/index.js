#! /usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const { prompt } = require("enquirer");
const createJson = require("./createjson/createJson");
const updateJson = require("./updatejson/updateJson");
const giveTestimonial = require("./givetestimonial/giveTestimonial");
const addEvent = require("./addevent/addEvent");
console.log(
  chalk.bgWhite.bold(` Welcome to LinkFree CLI! Let's get started. `)
);

const choices = [
  "Create a LinkFree JSON file",
  "Update an existing JSON file",
  "Provide a testimonial to a LinkFree user",
  "Add an event",
];

prompt([
  {
    type: "select",
    name: "selectedtask",
    choices: choices,
    message: "Choose one option (Press down arrow to traverse the list)",
  },
])
  .then(async (answers) => {
    const { selectedtask } = answers;
    switch (selectedtask) {
      case "Create a LinkFree JSON file": {
        createJson();
        break;
      }
      case "Update an existing JSON file": {
        update();
        break;
      }
      case "Provide a testimonial to a LinkFree user": {
        giveTestimonial();
        break;
      }
      default:
        addEvent();
    }
  })
  .catch((error) => {
    console.error(error);
  });

const update = async () => {
  const githubUsername = await getUsername();
  if (fs.existsSync(`./data/${githubUsername}.json`)) {
    updateJson(githubUsername);
  } else {
    console.log(
      chalk.bgYellow.bold(
        ` File ${githubUsername}.json doesn't exist! Please enter valid username`
      )
    );
    update();
  }
};

const getUsername = async () => {
  const answers = await prompt([
    {
      type: "input",
      name: "name",
      message: "What is your GitHub username? (case sensitive)",
    },
  ]);

  if (answers.name === "") {
    console.log(chalk.bgRed.bold(` Please enter a valid GitHub username. `));
    getUsername();
  } else {
    return answers.name;
  }
};
