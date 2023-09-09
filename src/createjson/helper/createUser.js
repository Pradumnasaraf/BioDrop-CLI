import jsonFormat from "json-format";
import chalk from "chalk";
import fs from "fs";
import process from "process";

async function createUser(githubUsername, answers) {
  let jsonSchema = {
    name: `${answers.name}`,
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
        chalk.black.bgYellow(
          ` You are not in the root directory of BioDrop. Try again! `
        )
      );
      process.exit(0);
    } else {
      console.log(
        chalk.black.bgYellow(
          ` File ${githubUsername}.json created successfully! `
        )
      );
    }
  });
}

export default createUser;
