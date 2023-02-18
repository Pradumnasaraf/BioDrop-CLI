const { prompt } = require("enquirer");

let tags = [];

async function addtags(bool) {
  while (bool) {
    let answers = await prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the tag?",
      },
      {
        type: "confirm",
        name: "addTag",
        message: "Do you want to add another tag?",
      },
    ]);
    tags.push(answers.name);
    if (!answers.addTag) {
      return tags;
    }
  }
}

async function removetags() {
  console.log("remove tags");
}

async function updatetags() {
  console.log("update tags");
}

module.exports = {
  addtags,
  removetags,
  updatetags,
};
