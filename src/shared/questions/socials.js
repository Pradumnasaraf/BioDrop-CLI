const { prompt } = require("enquirer");
const { geticons } = require("../assets/icons");

let socials = [];
let icons = [];

async function addsocials(bool) {
  icons = await geticons();

  while (bool) {
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
      icon: answers.icon,
      url: answers.url,
    });
    if (!answers.addsocials) {
      return socials;
    }
  }
}

async function removesocials(socials) {
  let choiceSocials = socials;
  let stop = false;
  choiceSocials.map((social) => {
    social.name = social.url;
  });
  while (!stop) {
    const answers = await prompt([
      {
        type: "select",
        name: "social",
        choices: choiceSocials,
        message: "Choose which one you want to remove",
      },
    ]);
    choiceSocials = choiceSocials.filter(
      (social) => social.name !== answers.social
    );
    if (choiceSocials.length !== 0) {
      const res = await prompt([
        {
          type: "confirm",
          name: "removeSocial",
          message: "Do you want to remove another social?",
        },
      ]);
      if (!res.removeSocial) {
        let result = [];
        choiceSocials.map((social) => {
          const { url, icon } = social;
          result.push({ url, icon });
        });
        return result;
      }
    } else {
      return [];
    }
  }
}

async function updatesocials(socials) {
  icons = await geticons();
  let choiceSocials = socials;
  let stop = false;
  choiceSocials.map(social => {
    social.name = social.url
  })
  while (!stop) {
    const answers = await prompt([
      {
        type: "select",
        name: "social",
        choices: choiceSocials,
        message: "Choose which one you want to update",
      },
    ]);
    const { url, icon, updateSocial } = await prompt([
      {
        type: "input",
        name: "url",
        message: "What is the new URL of the social media?",
      },
      {
        type: "select",
        name: "icon",
        choices: icons,
        message: "Choose a new icon (Press down arrow to see more options)",
      },
      {
        type: "confirm",
        name: "updateSocial",
        message: "Do you want to update another social?",
      },
    ]);
    choiceSocials.map((social) => {
      if (social.name === answers.social) {
        social.name = url
        social.url = url;
        social.icon = icon
      }
    });
    if (!updateSocial) {
      let result = [];
      choiceSocials.map((social) => {
        const { url, icon } = social;
        result.push({url, icon});
      });
      return result;
    }
  }
}

module.exports = {
  addsocials,
  removesocials,
  updatesocials,
};
