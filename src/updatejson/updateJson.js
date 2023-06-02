const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const jsonFormat = require("json-format");
isProfileUpdated = false;
const {
  addlinks,
  removelinks,
  updatelinks,
} = require("../shared/questions/links");
const {
  addmilestones,
  removemilestones,
  updatemilestones,
} = require("../shared/questions/milestones");
const { addtags, removetags, updatetags } = require("../shared/questions/tags");
const {
  addsocials,
  removesocials,
  updatesocials,
} = require("../shared/questions/socials");
const {
  addtestimonials,
  removetestimonials,
  updatetestimonials,
} = require("../shared/questions/testimonials");

let json;
const updateJson = async (githubUsername) => {
  await fs.readFile(`./data/${githubUsername}.json`, function (error, content) {
    if (error) {
      console.log(chalk.white.bgRed.bold("You are not in the root folder!"));
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
      isProfileUpdated = true;
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
      name: "bio",
      message: "Do you want to change your bio?",
    },
  ]).then(async (answers) => {
    if (answers.bio) {
      isProfileUpdated = true;
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
      name: "tag",
      message: "Do you want to update your tags?",
    },
  ]).then(async (answers) => {
    if (answers.tag) {
      isProfileUpdated = true;
      await prompt([
        {
          type: "select",
          name: "operation",
          message: "What you want to do?",
          choices: ["add a tag?", "remove a tag?", "update a tag?"],
        },
      ]).then(async (answers) => {
        switch (answers.operation) {
          case "add a tag?": {
            if (json.tags) {
              json.tags = [...json.tags, ...(await addtags(true))];
            } else {
              json.tags = [...(await addtags(true))];
            }
            break;
          }
          case "remove a tag?": {
            if (json.tags) {
              json.tags = [...(await removetags(json.tags))];
              if (json.tags.length === 0) {
                delete json.tags;
              }
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any tags to remove!")
              );
            }
            break;
          }
          default: {
            if (json.tags) {
              json.tags = [...(await updatetags(json.tags))];
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any tags to update!")
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
      name: "social",
      message: "Do you want to update your socials?",
    },
  ]).then(async (answers) => {
    if (answers.social) {
      isProfileUpdated = true;
      await prompt([
        {
          type: "select",
          name: "operation",
          message: "What you want to do?",
          choices: ["add a social?", "remove a social?", "update a social?"],
        },
      ]).then(async (answers) => {
        switch (answers.operation) {
          case "add a social?": {
            if (json.socials) {
              json.socials = [...json.socials, ...(await addsocials(true))];
            } else {
              json.socials = [...(await addsocials(true))];
            }
            break;
          }
          case "remove a social?": {
            if (json.socials) {
              json.socials = [...(await removesocials(json.socials))];
              if (json.socials.length === 0) {
                delete json.socials;
              }
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any socials to remove!")
              );
            }
            break;
          }
          default: {
            if (json.socials) {
              json.socials = [...(await updatesocials(json.socials))];
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any socials to update!")
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
      name: "link",
      message: "Do you want to update your links?",
    },
  ]).then(async (answers) => {
    if (answers.link) {
      isProfileUpdated = true;
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
              if (json.links.length === 0) {
                delete json.links;
              }
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any links to remove!")
              );
            }
            break;
          }
          default: {
            if (json.links) {
              json.links = [...(await updatelinks(json.links))];
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any links to update!")
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
      message: "Do you want to update your testimonials (usernames)?",
    },
  ]).then(async (answers) => {
    if (answers.testimonial) {
      isProfileUpdated = true;
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
              if (json.testimonials.length === 0) {
                delete json.testimonials;
              }
            } else {
              console.log(
                chalk.black.bgYellow(
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
                chalk.black.bgYellow(
                  "You don't have any testimonials to update!"
                )
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
      name: "milestone",
      message: "Do you want to update your milestones?",
    },
  ]).then(async (answers) => {
    if (answers.milestone) {
      isProfileUpdated = true;
      await prompt([
        {
          type: "select",
          name: "operation",
          message: "What you want to do?",
          choices: [
            "add a milestone?",
            "remove a milestone?",
            "update a milestone?",
          ],
        },
      ]).then(async (answers) => {
        switch (answers.operation) {
          case "add a milestone?": {
            if (json.milestones) {
              json.milestones = [
                ...json.milestones,
                ...(await addmilestones(true)),
              ];
            } else {
              json.milestones = [...(await addmilestones(true))];
            }
            break;
          }
          case "remove a milestone?": {
            if (json.milestones) {
              json.milestones = [...(await removemilestones(json.milestones))];
              if (json.milestones.length === 0) {
                delete json.milestones;
              }
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any milestones to remove!")
              );
            }
            break;
          }
          default: {
            if (json.milestones) {
              json.milestones = [...(await updatemilestones(json.milestones))];
            } else {
              console.log(
                chalk.black.bgYellow("You don't have any milestones to update!")
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
      console.log(chalk.black.bgYellow(` Couldn't update file. Try again! `));
      process.exit(0);
    } else {
      if (isProfileUpdated) {
        console.log(
          chalk.black.bgYellow(
            ` File ${githubUsername}.json updated successfully! `
          )
        );
      } else {
        console.log(
          chalk.black.bgYellow(
            `No updates were made in ${githubUsername}.json `
          )
        );
      }
    }
  });
};

module.exports = updateJson;
