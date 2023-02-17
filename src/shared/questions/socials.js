const { prompt } = require("enquirer");
const { geticons } = require("../assets/icons");

let socials = [];

async function addsocials(bool) {
  icons = await geticons();

  while (bool) {
    icons = await geticons();

    let answers = await prompt([
      {
        type: "input",
        name: "url",
        message: "Add the url of your social media",
      },
      {
        type: "select",
        name: "icon",
        choices: icons,
        message: "Choose an icon (Press down arrow to see more options)",
      },
      {
        type: "confirm",
        name: "addsocials",
        message: "Do you want to add another social media?",
      },
    ]);
    socials.push({
      icons: answers.icon,
      url: answers.url,
    });
    if (!answers.addsocials) {
      return socials;
    }
  }
}

async function removesocials() {
  console.log("remove socials");
}

async function updatesocials() {
  console.log("update socials");
}

module.exports = {
  addsocials,
  removesocials,
  updatesocials,
};
