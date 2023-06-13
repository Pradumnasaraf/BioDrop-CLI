const axios = require("axios");
const chalk = require("chalk");
const { prompt } = require("enquirer");
const chalkAnimation = require("chalk-animation");

const choises = []; // ['Twitter', 'LinkedIn', 'Instagram']
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
    `Hi, welcome to ${data.name}'s (${data.username}) LinkFree profile!\n`
  );
  setTimeout(() => {
    rainbow.start();
  }, 0);

  // Description block
  setTimeout(() => {
    rainbow.stop();
    getDescription(data);
  }, 3500);

  // Links block
  if (data.links.length !== 0) {
    setTimeout(() => {
      getLinks(data);
    }, 7000);
  }

  // Other elements of profile like milestones,

  // Contact block
  if (data.links.length !== 0) {
    setTimeout(() => {
      getContact();
    }, 10000);
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
  prompt([
    {
      type: "select",
      name: "contactPoint",
      message: "How would you like to contact them?",
      choices: choises,
    },
  ])
    .then((answers) => {
      const { contactPoint } = answers;
      console.log(
        chalk.white.bgGreen.bold(
          ` You can contact them at ${contactPoint}! Have a great day! `
        )
      );
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
    });
}

function extractContactData(link) {
  if (link.url.includes("twitter")) {
    if (choises.includes("Twitter")) {
      return;
    }
    choises.push("Twitter");
    contactPoints["Twitter"] = link;
  }
  if (link.url.includes("linkedin")) {
    if (choises.includes("LinkedIn")) {
      return;
    }
    choises.push("LinkedIn");
    contactPoints["LinkedIn"] = link;
  }
  if (link.url.includes("github")) {
    if (choises.includes("GitHub")) {
      return;
    }
    choises.push("GitHub");
    contactPoints["GitHub"] = link;
  }
  if (link.url.includes("mailto")) {
    if (choises.includes("Email")) {
      return;
    }
    choises.push("Email");
    contactPoints["Email"] = link;
  }
}

module.exports = usernameValidation;
