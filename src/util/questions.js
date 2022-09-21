const { prompt } = require("enquirer");
const chalk = require("chalk");

async function questions() {
  const answers = await prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name (e.g. Jone Doe)?",
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

let links = [];
async function addlinks(bool) {
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
        type: "input",
        name: "icon",
        message: "What is the icon of the link?",
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
