const axios = require("axios");
const chalk = require("chalk");
const { prompt } = require("enquirer");
const chalkAnimation = require("chalk-animation");

const userNameValid = () => {
  prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub username (case sensitive)?",
    },
  ])
    .then((answers) => {
      const { githubUsername } = answers;
      if (githubUsername === "") {
        console.log(
          chalk.white.bgRed.bold(` Please enter a valid GitHub username. `)
        );
        process.exit(0);
      }
      const queryUrl = `https://api.github.com/users/${githubUsername}`;
      axios
        .get(queryUrl)
        .then(async (res) => {
          if (res.status === 200) {
            await getUserData(githubUsername);
          }
        })
        .catch(() => {
          console.log(chalk.white.bgRed.bold(` GitHub username not found! `));
          process.exit(0);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

async function getUserData(githubUsername) {
  const queryUrl = `https://linkfree.io/api/profiles/${githubUsername}`;
  await axios
    .get(queryUrl)
    .then((res) => {
      if (res.status === 200) {
        displayUserData(res.data);
      }
    })
    .catch(() => {
      console.log(
        chalk.white.bgRed.bold(
          ` LinkFree profile not found with this GitHub username! `
        )
      );
      process.exit(0);
    });
}

function displayUserData(data) {
  const rainbow = chalkAnimation.karaoke(
    `Hi, welcome to ${data.name}'s (${data.username}) LinkFree profile!\n`
  );

  setTimeout(() => {
    rainbow.start(); // Animation resumes
  });

  setTimeout(() => {
    rainbow.stop(); // Animation stops

    getLinks(data);
  }, 3500);
}

function getLinks(data) {
  if (data.tags.length > 0) {
    let tagLine = "";
    for (let tag of data.tags) {
      tagLine += `${tag}, `;
    }
    console.log(
      chalk.magentaBright.bold(`${data.name} talks about ${tagLine}and more!\n`)
    );
  }

  setTimeout(() => {
    console.log(`\n   ` + chalk.yellowBright.bold(`Check out their links:`));
    for (let link of data.links) {
      console.log(
        `   > ${chalk.greenBright(link.name)} --> ${chalk.whiteBright(
          link.url
        )}`
      );
    }
  }, 2500);
}

module.exports = userNameValid;
