const jsonFormat = require("json-format");
const chalk = require("chalk");
const fs = require("fs");

//this function create required directories if they not exist
function createRequireddir(path)
{
  path = path.substring(0, path.lastIndexOf('/'));
  requireddirs = path.split("/");
  path="./"
  console.log(requireddirs);
  for (i = 0; i<requireddirs.length; i++)
  {
    console.log(requireddirs[i]);
    path+=requireddirs[i]+"/"
    fs.mkdir(path,()=>{});
  }
    console.log(path)
}

//this funtion create the json file
function createUserJson(githubUsername, answers) {
  sampleJson = {
    name: `${answers.name}`,
    type: `${answers.type}`,
    bio: `${answers.bio}`,
    avatar: `https://github.com/${githubUsername}.png`,
    links: [
      {
        name: "Follow me on GitHub",
        url: `https://github.com/${githubUsername}`,
        icon: "github",
      },
      { name: "", url: "", icon: "" },
    ],
    milestones: [
      { title: "", date: "", icon: "", color: "", description: "", url: "" },
    ],
  };

  createRequireddir("public/data/${githubUsername}.json")
  const json = jsonFormat(sampleJson, { type: "space", size: 2 });
  fs.writeFile(`./public/data/${githubUsername}.json`, json, (err) => {
    if (err) {
      console.log(
        chalk.bgYellow.bold(
          `cannot create json file`
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
