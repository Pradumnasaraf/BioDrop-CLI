const { prompt } = require("enquirer");
const { geticons, selecticon } = require("../assets/icons");

let milestones = [];

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
        message: "In which month and year did you achieve this milestone (eg. May 2020)",
      },
    ]);
    let selectedIcon = await selecticon();
    const confirm = await prompt([
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
        type: "select",
        name: "isGoal",
        message: "Is this a future goal? (This is optional question)",
        choices: ["Yes", "Skip this question"],
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
      icon: selectedIcon,
      date: answers.date,
      description: answers.description,
      color: answers.color,
    });

    if (answers.isGoal === "Yes") {
      milestones[milestones.length - 1].isGoal = true;
    }
    if (!confirm.addMilestone) {
      return milestones;
    }
  }
}

async function removemilestones(milestones) {
  let choiceMilestones = milestones;
  let stop = false;
  while (!stop) {
    const answers = await prompt([
      {
        type: "select",
        name: "milestone",
        choices: choiceMilestones,
        message: "Choose which one you want to remove",
      },
    ]);
    choiceMilestones = choiceMilestones.filter(
      (milestone) => milestone.title !== answers.milestone
    );
    if (choiceMilestones.length !== 0) {
      const res = await prompt([
        {
          type: "confirm",
          name: "removeMilestone",
          message: "Do you want to remove another milestone?",
        },
      ]);
      if (!res.removeMilestone) {
        let result = [];
        choiceMilestones.map((milestone) => {
          const { title, url, icon, description, date, color } = milestone;
          result.push({ title, url, icon, description, date, color });
        });
        return result;
      }
    } else {
      return [];
    }
  }
}

async function updatemilestones(milestones) {
  icons = await geticons();
  let choiceMilestones = milestones;
  let stop = false;
  while (!stop) {
    const answers = await prompt([
      {
        type: "select",
        name: "milestone",
        choices: choiceMilestones,
        message: "Choose which one you want to update",
      },
    ]);
    const { title, date } = await prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new title of the milestone?",
      },
      {
        type: "input",
        name: "date",
        message: "What is the new date of the milestone?",
      },
    ]);
    let selectedIcon = await selecticon();
    const { description, url, color, updateMilestone } = await prompt([
      {
        type: "input",
        name: "description",
        message: "What is the new description of the milestone?",
      },
      {
        type: "input",
        name: "url",
        message: "What is the new URL of the milestone?",
      },
      {
        type: "input",
        name: "color",
        message: "What is the new color theme of the milestone?",
      },
      {
        type: "confirm",
        name: "updateMilestone",
        message: "Do you want to update another milestone?",
      },
    ]);
    choiceMilestones.map((milestone) => {
      if (milestone.title === answers.milestone) {
        milestone.name = title;
        milestone.title = title;
        milestone.date = date;
        milestone.url = url;
        milestone.icon = selectedIcon;
        milestone.description = description;
        milestone.color = color;
      }
    });
    if (!updateMilestone) {
      let result = [];
      choiceMilestones.map((milestone) => {
        const { title, url, icon, description, date, color } = milestone;
        result.push({ title, url, icon, description, date, color });
      });
      return result;
    }
  }
}

module.exports = {
  addmilestones,
  removemilestones,
  updatemilestones,
};
