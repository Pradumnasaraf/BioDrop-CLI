const { prompt } = require("enquirer");
const { geticons } = require("../assets/icons");

let milestones = [];
let icons = [];

async function addmilestones(bool) {
  icons = await geticons();

  while (bool) {
    let answers = await prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your milestone?",
      },
      {
        type: "input",
        name: "date",
        message: "In which year you achieved it?",
      },
      {
        type: "select",
        name: "icon",
        choices: icons,
        message: "Choose an icon (Press down arrow to see more options)",
      },
      {
        type: "input",
        name: "description",
        message: "Give a short description for your milestone",
      },
      {
        type: "input",
        name: "url",
        message: "Give a url related to your milestone",
      },
      {
        type: "input",
        name: "color",
        message: "Give a color theme",
      },
      {
        type: "confirm",
        name: "addMilestone",
        message: "Do you want to add another milestone?",
      },
    ]);
    milestones.push({
      title: answers.title,
      url: answers.url,
      icon: answers.icon,
      date: answers.date,
      description: answers.description,
      color: answers.color,
    });
    if (!answers.addMilestone) {
      return milestones;
    }
  }
}

async function removemilestones(milestones) {
  console.log("Removing Milestones");
}

async function updateMilestones(milestones) {
  console.log("Updating Milestones");
}

module.exports = {
  addmilestones,
  removemilestones,
  updateMilestones,
};
