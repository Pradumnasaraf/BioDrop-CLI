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
        type: "select",
        name: "userStatus",
        message:
          "Are you the event organizer or a participant? (This is optional.)",
        choices: ["Organizer", "Participant", "None - Skip this question"],
      },
      {
        type: "input",
        name: "speakerDetails",
        message:
          "Give your topic of your talk at the event. (This is optional. Press enter to skip.)",
      },
      {
        type: "confirm",
        name: "isVirtual",
        message: "Is the event virtual?",
      },
      {
        type: "confirm",
        name: "isInPerson",
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
        name: "start",
        message:
          "Give event start date and time (Supported format: 2023-08-09T00:00:00.000+00:00)",
      },
      {
        type: "input",
        name: "end",
        message:
          "Give event end date and time (Supported format: 2023-08-09T00:00:00.000+00:00)",
      },
      {
        type: "input",
        name: "cfpClose",
        message:
          "Give CFP end date and time (Supported format: 2023-08-09T00:00:00.000+00:00) - (This is optional. Press enter to skip.)",
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
