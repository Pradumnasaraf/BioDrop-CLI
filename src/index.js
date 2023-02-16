#! /usr/bin/env node

const chalk = require("chalk");
const { prompt } = require("enquirer");
const createJson = require("./createjson/createJson");
const updateJson = require("./updatejson/updateJson");
const addTestimonial = require("./addtestimonial/addTestimonial");
const createTestimonial = require("./createtestimonial/createTestimonial");

console.log(
  chalk.bgWhite.bold(` Welcome to LinkFree CLI! Let's get started. `)
);

const choices = [
  "Create a LinkFree JSON file",
  "Update an existing JSON file",
  "Provide a testimonial to a LinkFree user",
  "Add a given testimonial to your JSON file",
];

prompt([
  {
    type: "select",
    name: "selectedtask",
    choices: choices,
    message: "Choose an icon (Press down arrow to see more options)",
  },
])
  .then((answers) => {
    const { selectedtask } = answers;
    if (selectedtask === "Create a LinkFree JSON file") {
      createJson();
    } else if (selectedtask === "Update an existing JSON file") {
      updateJson();
    } else if (selectedtask === "Provide a testimonial to a LinkFree user") {
      addTestimonial();
    } else if (selectedtask === "Add a given testimonial to your JSON file") {
      createTestimonial();
    }
  })
  .catch((error) => {
    console.error(error);
  });
