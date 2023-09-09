#! /usr/bin/env node

import chalk from "chalk";
import enquirer from "enquirer";
import createJson from "./createjson/createJson.js";
import checkUpdate from "./updatejson/helper/checkUpdate.js";
import giveTestimonial from "./givetestimonial/giveTestimonial.js";
import addEvent from "./addevent/addEvent.js";
import reportBug from "./reportbug/reportBug.js";
import searchProfile from "./searchprofile/searchProfile.js";

console.log(
  chalk.black.bgYellow(` Welcome to BioDrop CLI! Let's get started. `)
);

const choices = [
  "Create a BioDrop JSON file",
  "Search for a BioDrop user",
  "Update an existing JSON file",
  "Provide a testimonial to a BioDrop user",
  "Add an event",
  "Report a bug",
];

enquirer
  .prompt([
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
      case "Create a BioDrop JSON file": {
        createJson();
        break;
      }
      case "Search for a BioDrop user": {
        searchProfile();
        break;
      }
      case "Update an existing JSON file": {
        checkUpdate();
        break;
      }
      case "Provide a testimonial to a BioDrop user": {
        giveTestimonial();
        break;
      }
      case "Add an event": {
        addEvent();
        break;
      }
      default:
        reportBug();
    }
  })
  .catch((error) => {
    console.error(error);
  });
