const enquirer = require("enquirer");
const fs = require("fs");
const chalk = require("chalk");
const createtestimonialfile = require("./helper/createTestimonialFile");
const checktestimonial = require("./helper/checkTestimonial");

let testimonialWriter;
let testimonialReceiver;

async function givetestimonial() {
  let answers = await enquirer.prompt([
    {
      type: "input",
      name: "githubUsername",
      message: "What is your GitHub username? (case sensitive)",
    },
  ]);
  const { githubUsername } = answers;
  testimonialWriter = githubUsername;
  if (githubUsername === "") {
    console.log(
      chalk.white.bgRed.bold(` Please enter a valid GitHub username. `)
    );
    givetestimonial();
  } else if (!fs.existsSync(`./data/${githubUsername}.json`)) {
    console.log(
      chalk.black.bgYellow(
        ` You don't have a LinkFree JSON file!. Create an account first! `
      )
    );
    process.exit(0);
  } else {
    let answers = await enquirer.prompt([
      {
        type: "input",
        name: "githubUsername",
        message:
          "What is the GitHub username of the person you want to give a testimonial to? (case sensitive)",
      },
    ]);
    const { githubUsername } = answers;
    testimonialReceiver = githubUsername;
    if (githubUsername === "") {
      console.log(
        chalk.white.bgRed.bold(` Please enter a valid GitHub username. `)
      );
      givetestimonial();
    } else if (!fs.existsSync(`./data/${githubUsername}.json`)) {
      console.log(
        chalk.black.bgYellow(
          ` The person you want to give a testimonial to doesn't have a LinkFree JSON file!. Ask them to create an account first! `
        )
      );
      process.exit(0);
    } else {
      if (testimonialReceiver == testimonialWriter) {
        console.log(
          chalk.white.bgRed.bold(` You can't give a testimonial to yourself! `)
        );
        process.exit(0);
      } else if (
        await checktestimonial(testimonialWriter, testimonialReceiver)
      ) {
        console.log(
          chalk.white.bgRed.bold(
            ` You have already given a testimonial to this person! `
          )
        );
        process.exit(0);
      } else {
        let title = await testimonialtitle();
        let description = await testimonialdescription();
        createtestimonialfile(
          testimonialWriter,
          testimonialReceiver,
          title,
          description
        );
      }
    }
  }
}

async function testimonialtitle() {
  let answers = await enquirer.prompt([
    {
      type: "input",
      name: "testimonialtitle",
      message: "What is the title of your testimonial?",
    },
  ]);
  const { testimonialtitle } = answers;
  if (testimonialtitle === "") {
    console.log(
      chalk.white.bgRed.bold(` Please enter a valid testimonial title. `)
    );
    testimonialtitle();
  } else {
    return testimonialtitle;
  }
}

async function testimonialdescription() {
  let answers = await enquirer.prompt([
    {
      type: "input",
      name: "testimonial",
      message: "What is your testimonial?",
    },
  ]);
  const { testimonial } = answers;
  if (testimonial === "") {
    console.log(chalk.white.bgRed.bold(` Please enter a valid testimonial. `));
    testimonialdescription();
  } else {
    return testimonial;
  }
}

module.exports = givetestimonial;
