import chalk from "chalk";
import fs from "fs";
import enquirer from "enquirer";
import updateJson from "../updateJson.js";

async function checkUpdate() {
  const githubUsername = await getUsername();
  if (fs.existsSync(`./data/${githubUsername}.json`)) {
    updateJson(githubUsername);
  } else {
    console.log(
      chalk.black.bgYellow(
        ` File ${githubUsername}.json doesn't exist! Please enter valid username or create a new JSON file. `
      )
    );
    checkUpdate();
  }
}

const getUsername = async () => {
  const answers = await enquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your GitHub username? (case sensitive)",
    },
  ]);

  if (answers.name === "") {
    console.log(
      chalk.white.bgRed.bold(` Please enter a valid GitHub username. `)
    );
    getUsername();
  } else {
    return answers.name;
  }
};

export default checkUpdate;
