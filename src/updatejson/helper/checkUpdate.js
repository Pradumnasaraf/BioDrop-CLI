const chalk = require("chalk");
const fs = require("fs");
const { prompt } = require("enquirer");
const updateJson = require("../updateJson");

async function checkUpdate() {
  const githubUsername = await getUsername();
  if (fs.existsSync(`./data/${githubUsername}.json`)) {
    updateJson(githubUsername);
  } else {
    console.log(
      chalk.bgYellow.bold(
        ` File ${githubUsername}.json doesn't exist! Please enter valid username`
      )
    );
    checkUpdate();
  }
}

const getUsername = async () => {
  const answers = await prompt([
    {
      type: "input",
      name: "name",
      message: "What is your GitHub username? (case sensitive)",
    },
  ]);

  if (answers.name === "") {
    console.log(chalk.bgRed.bold(` Please enter a valid GitHub username. `));
    getUsername();
  } else {
    return answers.name;
  }
};

module.exports = checkUpdate;
