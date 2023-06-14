const axios = require("axios");
const chalk = require("chalk");
const { prompt } = require("enquirer");
const chalkAnimation = require("chalk-animation");
const open = require("open");

const choices = []; // ['Twitter', 'LinkedIn', 'Instagram']
const contactPoints = {}; // {Twitter: 'https://twitter.com/username'}
const otherElementsChoices = []; // ['Milestones', 'Testimonials']

// Set timeouts for each block
timeOuts = {
  description: 4000,
  links: 7500,
  otherElements: 10500,
  contact: 5000, // Inside a function
};

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
          chalk.white.bgRed(` Please enter a valid GitHub username. `)
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
                  chalk.white.bgRed.bold(
                    ` LinkFree profile not found with ${githubUsername}! `
                  )
                );
                process.exit(0);
              });
          }
        })
        .catch(() => {
          console.log(
            chalk.white.bgRed.bold(` Please enter a valid GitHub username. `)
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
  }, 4000);

  if (data.tags.length !== 0) {
    setTimeout(() => {
      getDescription(data);
    }, timeOuts.description);
  } else {
    timeOuts.links = 4000;
    timeOuts.otherElements = 4000;
  }

  // Links block
  if (data.links.length !== 0) {
    setTimeout(() => {
      getLinks(data);
    }, timeOuts.links);
  } else {
    timeOuts.otherElements = 4000;
  }

  // Other elements of profile like milestonesa and testimonials
  if (data.milestones.length !== 0 || data.testimonials.length !== 0) {
    setTimeout(() => {
      getOtherElements(data);
    }, timeOuts.otherElements);
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

async function getOtherElements(data) {
  // TODO - Get other elements of profile like milestones and testimonials they are going to attend

  if (data.milestones.length !== 0) {
    otherElementsChoices.push("Check out their milestones");
  }
  if (data.testimonials.length !== 0) {
    otherElementsChoices.push("See what others say about them - Testimonials");
  }

  await prompt([
    {
      type: "select",
      name: "contactChoice",
      message: "What else would you like know about them?",
      choices: otherElementsChoices,
    },
  ])
    .then(async (answers) => {
      const { contactChoice } = answers;
      switch (contactChoice) {
        case "Check out their milestones":
          getMilestones(data.milestones);
          break;
        case "See what others say about them - Testimonials":
          getTestimonials(data.testimonials);
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(`\n`);
  // Contact block
  if (data.links.length !== 0) {
    setTimeout(() => {
      getContact();
    }, timeOuts.contact); // TODO - Change this to timeOuts.contact
  }
}

function getMilestones(data) {
  console.log(
    `\n   ` + chalk.yellowBright.bold(`Checkout their accomplishments:`)
  );

  for (let milestone of data) {
    if (milestone.title === "") {
      continue;
    }

    if (milestone.isGoal) {
      console.log(
        `   > ${chalk.cyanBright(milestone.title)} ${
          milestone.date
        } (Future Goal)`
      );
    } else {
      console.log(
        `   > ${chalk.cyanBright(milestone.title)} ${milestone.date}`
      );
    }
  }
}

function getTestimonials(data) {
  console.log(`\n ${chalk.yellowBright.bold(`Things people say about them:`)}`);

  for (let testimonial of data) {
    if (testimonial.isPinned) {
      console.log( 
        ` -> ${
          chalk.cyanBright.italic(
          // break the line after 10 words
          testimonial.description.replace(/((?:\S+\s+){20}\S+)/g, "$1\n")
        )}" - ${chalk.whiteBright(testimonial.username)}` + `\n`
      );
    }
  }
}

function getContact() {
  choices.push("Contact them later");
  prompt([
    {
      type: "select",
      name: "contactChoice",
      message: "How would you like to connect with them?",
      choices: choices,
    },
  ])
    .then(async (p1Answers) => {
      const { contactChoice } = p1Answers;
      if (contactChoice !== "Connect with them later") {
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

      if (contactChoice === "Connect with them later") {
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
