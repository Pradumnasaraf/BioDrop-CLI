import enquirer from "enquirer";

async function basics() {
  const answers = await enquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name (e.g. Jone Doe)?",
    },
    {
      type: "input",
      name: "bio",
      message: "Add a short bio about yourself",
    },
  ]);
  return answers;
}

export default basics;
