const enquirer = require("enquirer");
const fs = require("fs");
const chalk = require("chalk");
const createEventFile = require("./helper/createEventFile");

const addEvent = async () => {
  let answers = await enquirer.prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub username? (case sensitive)",
    },
  ]);
  let eventWriter = answers.githubUsername;

  if (eventWriter === "") {
    console.log(chalk.bgRed.bold(` Please enter a valid GitHub username. `));
    addEvent();
  } else if (!fs.existsSync(`./data/${eventWriter}.json`)) {
    console.log(
      chalk.bgYellow.bold(
        ` You don't have a LinkFree JSON file!. Create an account first! `
      )
    );
    process.exit(0);
  } else {
    let answers = await enquirer.prompt([
      {
        type: "confirm",
        name: "virtual",
        message: "Is the event virtual?",
      },
      {
        type: "confirm",
        name: "inperson",
        message: "Is the event in person?",
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of the event?",
      },
      {
        type: "input",
        name: "description",
        message: "Give a description of the event",
      },
      {
        type: "input",
        name: "url",
        message: "Give associated URL for the event",
      },
      {
        type: "input",
        name: "startDate",
        message: "Give event start date in this format: (YYYY-MM-DD)",
      },
      {
        type: "input",
        name: "endDate",
        message: "Give event end date in this format: (YYYY-MM-DD)",
      },
      {
        type: "input",
        name: "color",
        message: "Give a color theme",
      },
    ]);

    createEventFile(eventWriter, answers);
  }
};

module.exports = addEvent;
