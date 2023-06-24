#! /usr/bin/env node

import chalk from "chalk";
import enquirer from "enquirer";
import fs from "fs";
import process from "process";
import createUser from "./helper/createUser.js";
import checkUser from "../shared/checkUser.js";
import basics from "../shared/questions/basics.js";
import { addlinks } from "../shared/questions/links.js";
import { addtags } from "../shared/questions/tags.js";
import { addmilestones } from "../shared/questions/milestones.js";
import { addsocials } from "../shared/questions/socials.js";
import updateJson from "../updatejson/updateJson.js";

let json;

const createJson = () => {
  enquirer
    .prompt([
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
          chalk.white.bgRed.bold(` Please enter a valid GitHub username. `)
        );
        createJson();
      } else if (fs.existsSync(`./data/${githubUsername}.json`)) {
        console.log(
          chalk.black.bgYellow(` File ${githubUsername}.json already exists!`)
        );
        enquirer
          .prompt([
            {
              type: "confirm",
              name: "overwrite",
              message: "Do you want to update the existing file?",
            },
          ])
          .then((answers) => {
            const { overwrite } = answers;
            if (overwrite) {
              console.log(
                chalk.bgGreen.bold(` Proceed with updating file... `)
              );
              updateJson(githubUsername);
            } else {
              console.log(chalk.white.bgRed.bold(` File not updated! `));
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
      basics().then(async (answers) => {
        json = answers;
        await enquirer
          .prompt([
            {
              type: "confirm",
              name: "addLink",
              message: "Do you want to add a link?",
            },
          ])
          .then(async (answers) => {
            if (answers.addLink) {
              json.links = await addlinks(true);
            }
          });

        await enquirer
          .prompt([
            {
              type: "confirm",
              name: "addTag",
              message: "Do you want to add a tag?",
            },
          ])
          .then(async (answers) => {
            if (answers.addTag) {
              json.tags = await addtags(true);
            }
          });

        await enquirer
          .prompt([
            {
              type: "confirm",
              name: "addSocial",
              message: "Do you want to add a social?",
            },
          ])
          .then(async (answers) => {
            if (answers.addSocial) {
              json.social = await addsocials(true);
            }
          });

        await enquirer
          .prompt([
            {
              type: "confirm",
              name: "addMilestone",
              message: "Do you want to add a milestone?",
            },
          ])
          .then(async (answers) => {
            if (answers.addMilestone) {
              json.milestones = await addmilestones(true);
            }
          });

        createUser(githubUsername, json);
      });
    } else {
      console.log(
        chalk.white.bgRed.bold(
          ` User with username '${githubUsername}' does not exist on GitHub, try again! `
        )
      );
      createJson();
    }
  });
}

export default createJson;
