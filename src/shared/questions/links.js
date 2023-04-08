const { prompt } = require("enquirer");
const { selecticon } = require("../assets/icons");
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
        name: "color", // use color instead of addColor so that we don't get confused in keys. Sam for group
        message: "Give a color theme",
      },
      {
        type: "input",
        name: "group",
        message: "Give a group name",
      },
    ]);
    let selectedIcon = await selecticon();
    const confirm = await prompt([
      {
        type: "confirm",
        name: "addLink",
        message: "Do you want to add another link?",
      },
    ]);
    links.push({
      name: answers.name,
      url: answers.url,
      icon: selectedIcon,
    });

    if(answers.color !== "") {
      links[links.length -1].color = answers.color
    }
    if(answers.group !== "") {
      links[links.length -1].group = answers.group
    }
    
    if (!confirm.addLink) {
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
    const { name, url, color, group } = await prompt([
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
      {
        type: "input",
        name: "color",
        message: "What is the new color theme?",
      },
      {
        type: "input",
        name: "group",
        message: "What is the new group name?",
      },
    ]);
    const selectedIcon = await selecticon();
    const { updateLink } = await prompt([
      {
        type: "confirm",
        name: "updateLink",
        message: "Do you want to update another link?",
      },
    ]);
    
    if(answers.color !== "") {
      links[links.length - 1].color = answers.color;
    }

    if(answers.group !== "") {
      links[links.length - 1].group = answers.group;
    }

    choiceLinks.map((link) => {
      if (link.name === answers.link) {
        link.name = name;
        link.url = url;
        link.icon = selectedIcon;
        link.color = color;
        link.group = group;
      }
    });

    if (!updateLink) {
      let result = [];
      choiceLinks.map((link) => {
        const { name, url, icon, color, group } = link;
        result.push({ name, url, icon, color, group });
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
