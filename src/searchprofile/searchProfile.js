const axios = require("axios");
const chalk = require("chalk");
const { prompt } = require("enquirer");
const chalkAnimation = require("chalk-animation");
const open = require("open");

const choices = []; // ['Twitter', 'LinkedIn', 'Instagram']
const contactPoints = {}; // {Twitter: 'https://twitter.com/username'}

const usernameValidation = () => {
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
      axios
        .get(`https://api.github.com/users/${githubUsername}`)
        .then(async (res) => {
          if (res.status === 200) {
            await axios
              .get(`https://linkfree.io/api/profiles/${githubUsername}`)
              .then((res) => {
                if (res.status === 200) {
                  displayData(res.data);
                }
              })
              .catch(() => {
                console.log(
                  chalk.white.bgRed(
                    ` LinkFree profile not found with ${githubUsername}! `
                  )
                );
                process.exit(0);
              });
          }
        })
        .catch(() => {
          console.log(
            chalk.white.bgRed.bold(` User with ${githubUsername} not found! `)
          );
          process.exit(0);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

function displayData(data) {
  // Welcome block
  const rainbow = chalkAnimation.karaoke(
    `\nHi, welcome to ${data.name}'s (${data.username}) LinkFree profile!\n`
  );
  setTimeout(() => {
    rainbow.start();
  }, 0);

  // Description block
  setTimeout(() => {
    rainbow.stop();
    getDescription(data);
  }, 4000);

  // Links block
  if (data.links.length !== 0) {
    setTimeout(() => {
      getLinks(data);
    }, 7500);
  }

  // Other elements of profile like milestones,

  // Contact block
  if (data.links.length !== 0) {
    setTimeout(() => {
      getContact();
    }, 10500);
  }
}

function getDescription(data) {
  if (data.tags.length > 0) {
    let tagLine = "";
    for (let tag of data.tags) {
      tagLine += `${tag}, `;
    }
    console.log(
      chalk.magentaBright.bold(`${data.name} talks about ${tagLine}and more!\n`)
    );
  }
}

function getLinks(data) {
  console.log(`   ` + chalk.yellowBright.bold(`Check out their links:`));
  for (let link of data.links) {
    console.log(
      `   > ${chalk.greenBright(link.name)} --> ${chalk.whiteBright(link.url)}`
    );
    // This added data will used in the contact block for prompt
    extractContactData(link);
  }

  console.log(`\n`);
}

function getContact() {
  choices.push("Contact them later");
  prompt([
    {
      type: "select",
      name: "contactChoice",
      message: "How would you like to contact them?",
      choices: choices,
    },
  ])
    .then(async (p1Answers) => {
      const { contactChoice } = p1Answers;
      if (contactChoice !== "Contact them later") {
        // Confirm before opening browser
        prompt([
          {
            type: "confirm",
            name: "openBrowser",
            message: `You will be redirected to ${contactChoice}. Do you confirm to open the browser?`,
          },
        ]).then(async (p2Answers) => {
          if (p2Answers.openBrowser) {
            await open(contactPoints[contactChoice]);
          }
        });
      }

      if (contactChoice === "Contact them later") {
        process.exit(0);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Extracts contact data from the links array
function extractContactData(link) {
  if (link.url.includes("twitter")) {
    if (choices.includes("Twitter")) {
      return;
    }
    choices.push("Twitter");
    contactPoints["Twitter"] = link.url;
  }
  if (link.url.includes("linkedin")) {
    if (choices.includes("LinkedIn")) {
      return;
    }
    choices.push("LinkedIn");
    contactPoints["LinkedIn"] = link.url;
  }
  if (link.url.includes("github")) {
    if (choices.includes("GitHub")) {
      return;
    }
    choices.push("GitHub");
    contactPoints["GitHub"] = link.url;
  }
  if (link.url.includes("mailto")) {
    if (choices.includes("Email")) {
      return;
    }
    choices.push("Email");
    contactPoints["Email"] = link.url;
  }
}

module.exports = usernameValidation;
