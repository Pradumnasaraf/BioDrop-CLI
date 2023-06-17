import fs from "fs";
import chalk from "chalk";
import jsonFormat from "json-format";

function createEventFile(eventWriter, answers) {
  const {
    userStatus,
    speakerDetails,
    isVirtual,
    isInPerson,
    name,
    description,
    url,
    start,
    end,
    cfpClose,
    color,
  } = answers;

  let jsonSchema = {
    isVirtual: Boolean(isVirtual),
    isInPerson: Boolean(isInPerson),
    color: color,
    name: name,
    description: description,
    date: {
      start: start,
      end: end,
    },
    url: url,
  };

  if (cfpClose) {
    jsonSchema.date.cfpClose = cfpClose;
  }

  if (userStatus === "Organizer" || userStatus === "Participant") {
    jsonSchema.userStatus = userStatus;
  }

  if (speakerDetails) {
    jsonSchema.speakerDetails = speakerDetails;
  }

  const json = jsonFormat(jsonSchema, { type: "space", size: 2 });

  if (fs.existsSync("./data")) {
    if (fs.existsSync(`./data/${eventWriter}/events`)) {
      fs.writeFile(
        `./data/${eventWriter}/events/${start.split("T")[0]}-${name
          .toLowerCase()
          .split(" ")
          .join("-")}.json`,
        json,
        (err) => {
          if (err) {
            console.log(
              chalk.black.bgYellow(
                `Something went wrong while creating the file. Try again! part 1`
              )
            );
            process.exit(0);
          } else {
            console.log(
              chalk.black.bgYellow(
                ` File ${start.split("T")[0]}-${name
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
            `./data/${eventWriter}/events/${start.split("T")[0]}-${name
              .toLowerCase()
              .split(" ")
              .join("-")}.json`,
            json,
            (err) => {
              if (err) {
                console.log(
                  chalk.black.bgYellow(
                    `Something went wrong while creating the file. Try again! part 2`
                  )
                );
                process.exit(0);
              } else {
                console.log(
                  chalk.black.bgYellow(
                    ` File ${start.split("T")[0]}-${name
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
            chalk.black.bgYellow(
              `Something went wrong while creating the directory. Try again!`
            )
          );
          process.exit(0);
        });
    }
  } else {
    console.log(
      chalk.black.bgYellow(
        ` You are not in the root directory of LinkFree. Try again! `
      )
    );
    process.exit(0);
  }
}

export default createEventFile;
