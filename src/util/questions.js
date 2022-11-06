const { prompt } = require("enquirer");
const chalk = require("chalk");
const axios = require("axios");

let links = [];
let icons = [];

async function questions() {
  const answers = await prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name (e.g. Jone Doe)?",
    },
    {
      type: "confirm",
      name: "displaystatspublic",
      message: "Do you want to display your stats publicly (e.g. Profile views)?",
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
  ]);
  return answers;
}

async function geticons() {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/EddieHubCommunity/LinkFree/main/src/config/links.json`
    );
    icons = Object.keys(response.data.validIcons);
  } catch (error) {
    console.error(error);
  }
}

async function addlinks(bool) {
  // wait for the icons to be fetched
  await geticons();

  while (bool) {
    let answers = await prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the link?",
      },
      {
        type: "input",
        name: "url",
        message: "What is the URL of the link?",
      },
      {
        type: "select",
        name: "icon",
        choices: icons,
      },
      {
        type: "confirm",
        name: "addLink",
        message: "Do you want to add another link?",
      },
    ]);
    links.push({
      name: answers.name,
      url: answers.url,
      icon: answers.icon,
    });
    if (!answers.addLink) {
      return links;
    }
  }
}

module.exports = { questions, addlinks };
