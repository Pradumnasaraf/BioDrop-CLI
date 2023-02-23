const fs = require("fs");
const chalk = require("chalk");
const jsonFormat = require("json-format");

async function createtestimonialfile(
  testimonialWriter,
  testimonialReceiver,
  title,
  description
) {
  let jsonSchema = {
    title: `${title}`,
    description: `${description}`,
    date: `${getdate()}`,
  };

  const json = jsonFormat(jsonSchema, { type: "space", size: 2 });

  // Check if we are in the root directory of LinkFree
  if (fs.existsSync("./data")) {
    // Check if user reciving the testimonial has a "testimonials" directory.
    if (fs.existsSync(`./data/${testimonialReceiver}/testimonials`)) {
      fs.writeFile(
        `./data/${testimonialReceiver}/testimonials/${testimonialWriter}.json`,
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
                ` File ${testimonialReceiver}.json created successfully! `
              )
            );
          }
        }
      );
    } else {
      // If the user doesn't have a "testimonials" directory, create one.
      fs.promises
        .mkdir(`./data/${testimonialReceiver}/testimonials`, {
          recursive: true,
        })
        .then(() => {
          fs.writeFile(
            `./data/${testimonialReceiver}/testimonials/${testimonialWriter}.json`,
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
                    ` File ${testimonialReceiver}.json created successfully! `
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

function getdate() {
  // get in the format of YYYY-MM-DD
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

module.exports = createtestimonialfile;
