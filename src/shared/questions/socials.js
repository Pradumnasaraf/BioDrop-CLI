const { prompt } = require("enquirer");
const { selecticon } = require("../assets/icons");

let socials = [];

async function addsocials(bool) {
  while (bool) {
    let answers = await prompt([
      {
        type: "input",
        name: "url",
        message: "Add the url of your social media",
      },
    ]);
    let selectedIcon = await selecticon();
    const confirm = await prompt([
      {
        type: "confirm",
        name: "addsocials",
        message: "Do you want to add another social media?",
      },
    ]);
    socials.push({
      icon: selectedIcon,
      url: answers.url,
    });
    if (!confirm.addsocials) {
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
        message: "Choose which one you want to update",
      },
    ]);
    const { url } = await prompt([
      {
        type: "input",
        name: "url",
        message: "What is the new URL of the social media?",
      },
    ]);
    let selectedIcon = await selecticon();
    const { updateSocial } = await prompt([
      {
        type: "confirm",
        name: "updateSocial",
        message: "Do you want to update another social?",
      },
    ]);
    choiceSocials.map((social) => {
      if (social.name === answers.social) {
        social.name = url;
        social.url = url;
        social.icon = selectedIcon;
      }
    });
    if (!updateSocial) {
      let result = [];
      choiceSocials.map((social) => {
        const { url, icon } = social;
        result.push({ url, icon });
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
