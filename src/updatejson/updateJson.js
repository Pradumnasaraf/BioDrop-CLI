const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const jsonFormat = require("json-format");
const {
  addlinks,
  removelinks,
  updatelinks,
} = require("../shared/questions/links");
const {
  addtestimonials,
  removetestimonials,
  updatetestimonials,
} = require("../shared/questions/testimonials");

let json;
const updateJson = async (githubUsername) => {
  await fs.readFile(`./data/${githubUsername}.json`, function (error, content) {
    if (error) {
      console.log(chalk.bgRed.bold("You are not in the root folder!"));
      console.log("Restart the program to try again.");
      process.exit(0);
    }
    json = JSON.parse(content);
  });

  await prompt([
    {
      type: "confirm",
      name: "name",
      message: "Do you want to change your name?",
    },
  ]).then(async (answers) => {
    if (answers.name) {
      await prompt([
        {
          type: "input",
          name: "name",
          message: "What is your new name?",
        },
      ]).then((answers) => (json.name = answers.name));
    }
  });

  await prompt([
    {
      type: "confirm",
      name: "type",
      message: "Do you want to change your profile type?",
    },
  ]).then(async (answers) => {
    if (answers.type) {
      await prompt([
        {
          type: "select",
          name: "type",
          message: "Your new profile type?",
          choices: ["Personal", "Community"],
        },
      ]).then((answers) => (json.type = answers.type));
    }
  });

  await prompt([
    {
      type: "confirm",
      name: "bio",
      message: "Do you want to change your bio?",
    },
  ]).then(async (answers) => {
    if (answers.bio) {
      await prompt([
        {
          type: "input",
          name: "bio",
          message: "Your new bio?",
        },
      ]).then((answers) => (json.bio = answers.bio));
    }
  });

  await prompt([
    {
      type: "confirm",
      name: "link",
      message: "Do you want to update your links?",
    },
  ]).then(async (answers) => {
    if (answers.link) {
      await prompt([
        {
          type: "select",
          name: "operation",
          message: "What you want to do?",
          choices: ["add a link?", "remove a link?", "update a link?"],
        },
      ]).then(async (answers) => {
        switch (answers.operation) {
          case "add a link?": {
            if (json.links) {
              json.links = [...json.links, ...(await addlinks(true))];
            } else {
              json.links = [...(await addlinks(true))];
            }
            break;
          }
          case "remove a link?": {
            if (json.links) {
              json.links = [...(await removelinks(json.links))];
            } else {
              console.log(
                chalk.bgYellow.bold("You don't have any links to remove!")
              );
            }
            break;
          }
          default: {
            if (json.links) {
              json.links = [...(await updatelinks(json.links))];
            } else {
              console.log(
                chalk.bgYellow.bold("You don't have any links to update!")
              );
            }
          }
        }
      });
    }
  });

  await prompt([
    {
      type: "confirm",
      name: "testimonial",
      message: "Do you want to update your testimonials?",
    },
  ]).then(async (answers) => {
    if (answers.testimonial) {
      await prompt([
        {
          type: "select",
          name: "operation",
          message: "What you want to do?",
          choices: [
            "add a testimonial?",
            "remove a testimonial?",
            "update a testimonial?",
          ],
        },
      ]).then(async (answers) => {
        switch (answers.operation) {
          case "add a testimonial?": {
            if (json.testimonials) {
              json.testimonials = [
                ...json.testimonials,
                ...(await addtestimonials(true)),
              ];
            } else {
              json.testimonials = [...(await addtestimonials(true))];
            }
            break;
          }
          case "remove a testimonial?": {
            if (json.testimonials) {
              json.testimonials = [
                ...(await removetestimonials(json.testimonials)),
              ];
            } else {
              console.log(
                chalk.bgYellow.bold(
                  "You don't have any testimonials to remove!"
                )
              );
            }
            break;
          }
          default: {
            if (json.testimonials) {
              json.testimonials = [
                ...(await updatetestimonials(json.testimonials)),
              ];
            } else {
              console.log(
                chalk.bgYellow.bold(
                  "You don't have any testimonials to update!"
                )
              );
            }
          }
        }
      });
    }
  });

  json = jsonFormat(json, { type: "space", size: 2 });
  fs.writeFile(`./data/${githubUsername}.json`, json, (err) => {
    if (err) {
      console.log(chalk.bgYellow.bold(` Couldn't update file. Try again! `));
      process.exit(0);
    } else {
      console.log(
        chalk.bgWhite.bold(
          ` File ${githubUsername}.json updated successfully! `
        )
      );
    }
  });
};

module.exports = updateJson;
