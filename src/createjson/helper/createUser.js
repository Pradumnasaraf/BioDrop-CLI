const jsonFormat = require("json-format");
const chalk = require("chalk");
const fs = require("fs");

async function createUser(githubUsername, answers) {
  sampleJson = {
    name: `${answers.name}`,
    type: `${answers.type}`,
    bio: `${answers.bio}`,
  };
  if (answers.links) {
    sampleJson.links = answers.links;
  }
  // if (answers.milestones) {
  //   sampleJson.milestones = answers.milestones;
  // }

  const json = jsonFormat(sampleJson, { type: "space", size: 2 });
  fs.writeFile(`./data/${githubUsername}.json`, json, (err) => {
    if (err) {
      console.log(
        chalk.bgYellow.bold(
          ` You are not in the root directory of LinkFree. Try again! `
        )
      );
      process.exit(0);
    } else {
      console.log(
        chalk.bgWhite.bold(
          ` File ${githubUsername}.json created successfully! `
        )
      );
    }
  });
}

module.exports = createUser;
