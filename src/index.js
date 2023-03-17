#! /usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const { prompt } = require("enquirer");
const createJson = require("./createjson/createJson");
const checkUpdate = require("./updatejson/helper/checkUpdate");
const giveTestimonial = require("./givetestimonial/giveTestimonial");
const addEvent = require("./addevent/addEvent");
const reportBug = require("./reportbug/reportBug");
console.log(
  chalk.black.bgYellow(` Welcome to LinkFree CLI! Let's get started. `)
);

const choices = [
  "🔗 Create a LinkFree JSON file",
  "🔧 Update an existing JSON file",
  "🤝 Provide a testimonial to a LinkFree user",
  "📅 Add an event",
  "🐛 Report a bug",
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
      case "🔗 Create a LinkFree JSON file": {
        createJson();
        break;
      }
      case "🔧 Update an existing JSON file": {
        checkUpdate();
        break;
      }
      case "🤝 Provide a testimonial to a LinkFree user": {
        giveTestimonial();
        break;
      }
      case "📅 Add an event": {
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
