const fs = require("fs");
const chalk = require("chalk");
const jsonFormat = require("json-format");

function createEventFile(eventWriter, answers) {
  const { virtual, inperson, name, description, url, startDate, endDate, color } =
    answers;
  let jsonSchema = {
    isVirtual: Boolean(virtual),
    isInPerson: Boolean(inperson),
    color:color,
    name: name,
    description: description,
    date: {
      start: new Date(startDate),
      end: new Date(endDate),
    },
    url: url,
  };

  const json = jsonFormat(jsonSchema, { type: "space", size: 2 });

  if (fs.existsSync("./data")) {
    if (fs.existsSync(`./data/${eventWriter}/events`)) {
      fs.writeFile(
        `./data/${eventWriter}/events/${startDate}-${name.toLowerCase().split(' ').join('-')}.json`,
        json,
        (err) => {
          if (err) {
            console.log(
              chalk.bgYellow.bold(
                `Something went wrong while creating the file. Try again! part 1`
              )
            );
            process.exit(0);
          } else {
            console.log(
              chalk.bgWhite.bold(
                ` File ${startDate}-${name
                  .toLowerCase()
                  .split(" ")
                  .join("-")}.json created successfully! `
              )
            );
          }
        }
      );
    } else {
      // If the user doesn't have a "events" directory, create one.
      fs.promises
        .mkdir(`./data/${eventWriter}/events`, {
          recursive: true,
        })
        .then(() => {
          fs.writeFile(
            `./data/${eventWriter}/events/${startDate}-${name
              .toLowerCase()
              .split(" ")
              .join("-")}.json`,
            json,
            (err) => {
              if (err) {
                console.log(
                  chalk.bgYellow.bold(
                    `Something went wrong while creating the file. Try again! part 2`
                  )
                );
                process.exit(0);
              } else {
                console.log(
                  chalk.bgWhite.bold(
                    ` File ${startDate}-${name
                      .toLowerCase()
                      .split(" ")
                      .join("-")}.json created successfully! `
                  )
                );
              }
            }
          );
        })
        .catch(() => {
          console.log(
            chalk.bgYellow.bold(
              `Something went wrong while creating the directory. Try again!`
            )
          );
          process.exit(0);
        });
    }
  } else {
    console.log(
      chalk.bgYellow.bold(
        ` You are not in the root directory of LinkFree. Try again! `
      )
    );
    process.exit(0);
  }
}

module.exports = createEventFile;
