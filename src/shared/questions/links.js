const { prompt } = require("enquirer");
const { geticons } = require("../assets/icons");
let links = [];
let icons = [];

const autocomplete = new AutoComplete({
  name: 'icon',
  message: 'Choose an icon (Search to see more options)',
  limit: 10,
  choices: icons
})

async function addlinks(bool) {
  icons = await geticons();

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
        autocomplete.run(),
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

async function updatelinks(links) {
  icons = await geticons();
  let choiceLinks = links;
  let stop = false;
  while (!stop) {
    const answers = await prompt([
      {
        type: "select",
        name: "link",
        choices: choiceLinks,
        message: "Choose which one you want to update",
      },
    ]);
    const { name, url, icon, updateLink } = await prompt([
      {
        type: "input",
        name: "name",
        message: "What is the new name of the link?",
      },
      {
        type: "input",
        name: "url",
        message: "What is the new URL of the link?",
      },
        autocomplete.run(),
      {
        type: "confirm",
        name: "updateLink",
        message: "Do you want to update another link?",
      },
    ]);
    choiceLinks.map((link) => {
      if (link.name === answers.link) {
        link.name = name;
        link.url = url;
        link.icon = icon;
      }
    });
    if (!updateLink) {
      let result = [];
      choiceLinks.map((link) => {
        const { name, url, icon } = link;
        result.push({ name, url, icon });
      });
      return result;
    }
  }
}

module.exports = {
  addlinks,
  removelinks,
  updatelinks,
};
