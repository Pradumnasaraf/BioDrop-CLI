#! /usr/bin/env node

const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const createUser = require("./helper/createUser");
const checkUser = require("./helper/checkUser");
const {
  questions,
  addlinks,
  addmilestones,
  addtestimonials,
} = require("./helper/questions");
const updateJson = require("../updatejson/updateJson");
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
      const { githubUsername } = answers;
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
            message: "Do you want to update the existing file?",
          },
        ]).then((answers) => {
          const { overwrite } = answers;
          if (overwrite) {
            console.log(chalk.bgGreen.bold(` Proceed with updating file... `));
            updateJson(githubUsername);
          } else {
            console.log(chalk.bgRed.bold(` File not updated! `));
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
      questions().then(async (answers) => {
        json = answers;
        await prompt([
          {
            type: "confirm",
            name: "addLink",
            message: "Do you want to add a link?",
          },
        ]).then(async (answers) => {
          if (answers.addLink) {
            json.links = await addlinks(true);
          }
        });

        await prompt([
          {
            type: "confirm",
            name: "addMilestone",
            message: "Do you want to add a milestone?",
          },
        ]).then(async (answers) => {
          if (answers.addMilestone) {
            json.milestones = await addmilestones(true);
          }
        });

        await prompt([
          {
            type: "confirm",
            name: "addTestimonial",
            message: "Do you want to add a testimonial?",
          },
        ]).then(async (answers) => {
          if (answers.addTestimonial) {
            json.testimonials = await addtestimonials(true);
          }
        });

        createUser(githubUsername, json);
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

module.exports = createJson;
