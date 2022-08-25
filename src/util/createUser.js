const jsonFormat = require("json-format");
const fs = require("fs");

function craeteUserJson(githubUsername, answers) {
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

  const json = jsonFormat(sampleJson, { type: "space", size: 2 });
  fs.writeFile(`./public/data/${githubUsername}.json`, json, (err) => {
    if (err) throw err;
  });
}

module.exports = craeteUserJson;
