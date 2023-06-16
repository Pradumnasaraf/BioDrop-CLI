import enquirer from "enquirer";
import { selecticon } from "../assets/icons.js";
let links = [];

async function addlinks(bool) {
  while (bool) {
    let answers = await enquirer.prompt([
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
        name: "addColor",
        message: "Give a color theme. (Optional. Press enter to skip.)",
      },
      {
        type: "input",
        name: "addGroup",
        message: "Give a group name. (Optional. Press enter to skip.)",
      },
    ]);
    let selectedIcon = await selecticon();
    const confirm = await enquirer.prompt([
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

    // Check if user wants to add color or group name
    if (answers.addColor !== "") {
      links[links.length - 1].color = answers.addColor;
    }
    if (answers.addGroup !== "") {
      links[links.length - 1].group = answers.addGroup;
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
    const answers = await enquirer.prompt([
      {
        type: "select",
        name: "link",
        choices: choiceLinks,
        message: "Choose which one you want to remove",
      },
    ]);
    choiceLinks = choiceLinks.filter((link) => link.name !== answers.link);
    if (choiceLinks.length !== 0) {
      const res = await enquirer.prompt([
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
    const answers = await enquirer.prompt([
      {
        type: "select",
        name: "link",
        choices: choiceLinks,
        message: "Choose which one you want to update",
      },
    ]);
    const { name, url, color, group } = await enquirer.prompt([
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
        message:
          "What is the new color theme? (Optional. Press enter to skip.)",
      },
      {
        type: "input",
        name: "group",
        message: "What is the new group name? (Optional. Press enter to skip.)",
      },
    ]);
    const selectedIcon = await selecticon();
    const { updateLink } = await enquirer.prompt([
      {
        type: "confirm",
        name: "updateLink",
        message: "Do you want to update another link?",
      },
    ]);

    // Update the link properties with the new values
    choiceLinks.map((link) => {
      if (link.name === answers.link) {
        link.name = name;
        link.url = url;
        link.icon = selectedIcon;
        if (color !== "") {
          link.color = color;
        }
        if (group !== "") {
          link.group = group;
        }
      }
    });

    // If user doesn't want to update another link, return the updated links
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

export { addlinks, removelinks, updatelinks };
