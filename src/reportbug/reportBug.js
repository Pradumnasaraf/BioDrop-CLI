import open from "open";
import enquirer from "enquirer";

async function reportBug() {
  const questions = await enquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of the bug?",
    },
    {
      type: "input",
      name: "description",
      message: "Describe a description of the bug",
    },
  ]);
  const { username, title, description } = questions;
  const url = urlBuilder(username, title, description);

  const openBrowser = await enquirer.prompt([
    {
      type: "confirm",
      name: "openBrowser",
      message:
        "Thank you for taking the time to report the bug. For submitting it, you will be redirected to GitHub Issues. Do you want to open the browser?",
    },
  ]);
  if (openBrowser.openBrowser) {
    await open(url);
  }
}

function urlBuilder(username, title, description) {
  title = title.replace(/\s/g, "+");
  description = description.replace(/\s/g, "+");

  let customUrl = `https://github.com/Pradumnasaraf/BioDrop-CLI/issues/new?assignees=&labels=bug&template=bug.yaml&title=${title}+Report+by+@${username}&description=${description}`;
  return customUrl;
}

export default reportBug;
