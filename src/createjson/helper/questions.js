const { prompt } = require("enquirer");
const chalk = require("chalk");
const axios = require("axios");

let links = [];
let milestones = [];
let testimonials = [];
let icons = [];

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

async function geticons() {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/EddieHubCommunity/LinkFree/main/config/icons.json`
    );
    icons = Object.keys(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function removelinks(links) {
  let choiceLinks = links;
  let stop = false;
  while (!stop) {
    const answers = await prompt([
      {
        type: "select",
        name: "link",
        choices: choiceLinks,
        message: "Choose which one you want to remove",
      },
    ]);
    choiceLinks = choiceLinks.filter((link) => link.name !== answers.link);
    if (choiceLinks.length !== 0) {
      const res = await prompt([
        {
          type: "confirm",
          name: "removeLink",
          message: "Do you want to remove another link?",
        },
      ]);
      if (!res.removeLink) {
        let result = [];
        choiceLinks.map((link) => {
          const { name, url, icon } = link;
          result.push({ name, url, icon });
        });
        return result;
      }
    } else {
      return [];
    }
  }
}

function updatelinks(links) {
  console.log("updating links");
  return links;
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
        message: "Choose an icon (Press down arrow to see more options)",
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

async function addmilestones(bool) {
  await geticons();
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

async function addtestimonials(bool) {
  while (bool) {
    let answers = await prompt([
      {
        type: "input",
        name: "name",
        message: "Who gave the testimonial?(write their username)",
      },
      {
        type: "confirm",
        name: "addTestimonial",
        message: "Do you want to add another testimonial?",
      },
    ]);
    testimonials.push(answers.name);
    if (!answers.addTestimonial) {
      return testimonials;
    }
  }
}

module.exports = {
  questions,
  addlinks,
  removelinks,
  updatelinks,
  addmilestones,
  addtestimonials,
};
