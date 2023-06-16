import enquirer from "enquirer";

let tags = [];

async function addtags(bool) {
  while (bool) {
    let answers = await enquirer.prompt([
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

async function removetags(tags) {
  let choiceTags = tags;
  let stop = false;
  while (!stop) {
    const answers = await enquirer.prompt([
      {
        type: "select",
        name: "tag",
        choices: choiceTags,
        message: "Choose which one you want to remove",
      },
    ]);
    choiceTags = choiceTags.filter((tag) => tag.name !== answers.tag);
    if (choiceTags.length !== 0) {
      const res = await enquirer.prompt([
        {
          type: "confirm",
          name: "removeTag",
          message: "Do you want to remove another tag?",
        },
      ]);
      if (!res.removeTag) {
        let result = [];
        choiceTags.map((tag) => {
          const { name } = tag;
          result.push(name);
        });
        return result;
      }
    } else {
      return [];
    }
  }
}

async function updatetags(tags) {
  let choiceTags = tags;
  let stop = false;
  while (!stop) {
    const answers = await enquirer.prompt([
      {
        type: "select",
        name: "tag",
        choices: choiceTags,
        message: "Choose which one you want to update",
      },
    ]);
    const { name, updateTag } = await enquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the new name of the tag?",
      },
      {
        type: "confirm",
        name: "updateTag",
        message: "Do you want to update another tag?",
      },
    ]);
    choiceTags.map((tag) => {
      if (tag.name === answers.tag) {
        tag.name = name;
      }
    });
    if (!updateTag) {
      let result = [];
      choiceTags.map((tag) => {
        const { name } = tag;
        result.push(name);
      });
      return result;
    }
  }
}

export { addtags, removetags, updatetags };