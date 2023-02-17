const { prompt } = require("enquirer");

async function basics() {
  const answers = await prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name (e.g. Jone Doe)?",
    },
    {
      type: "select",
      name: "type",
      message: "Your profile type?",
      choices: ["Personal", "Community"],
    },
    {
      type: "input",
      name: "bio",
      message: "Add a short bio about yourself",
    },
  ]);
  return answers;
}

module.exports = {
  basics,
};
