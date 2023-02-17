const jsonFormat = require("json-format");
const chalk = require("chalk");
const fs = require("fs");

async function createUser(githubUsername, answers) {
  jsonSchema = {
    name: `${answers.name}`,
    type: `${answers.type}`,
    bio: `${answers.bio}`,
  };
  if (answers.links) {
    jsonSchema.links = answers.links;
  }
  if (answers.milestones) {
    jsonSchema.milestones = answers.milestones;
  }
  if (answers.tags) {
    jsonSchema.tags = answers.tags;
  }

  if (answers.social) {
    jsonSchema.social = answers.social;
  }

  const json = jsonFormat(jsonSchema, { type: "space", size: 2 });
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
