const jsonFormat = require("json-format");
const chalk = require("chalk");
const fs = require("fs");

async function createUserJson(githubUsername, answers) {
  sampleJson = {
    name: `${answers.name}`,
    type: `${answers.type}`,
    bio: `${answers.bio}`,
    links: answers.links ? answers.links : [],
    milestones: answers.milestones ? answers.milestones : [],
  };

  const json = jsonFormat(sampleJson, { type: "space", size: 2 });
  fs.writeFile(`./data/${githubUsername}.json`, json, (err) => {
    if (err) {
      console.log(
        chalk.bgYellow.bold(
          ` You are not in the root directory of LinkFree. Try again! `
        )
      );
    } else {
      console.log(
        chalk.bgWhite.bold(
          ` File with ${githubUsername}.json created successfully! `
        )
      );
    }
  });
}

module.exports = createUserJson;
