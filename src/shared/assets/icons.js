import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import enquirer from "enquirer";
import chalk from "chalk";
let icons = [];

async function geticons() {
  Object.keys(FaIcons).forEach((key) => {
    icons.push(key);
  });

  Object.keys(SiIcons).forEach((key) => {
    icons.push(key);
  });

  return icons;
}

async function selecticon() {
  const autocomplete = new enquirer.AutoComplete({
    name: "icon",
    message: "Select an icon (Start typing to find matching icons)",
    limit: 10,
    choices: geticons(),
    highlight: function (value) {
      return chalk.green(value);
    },
  });
  await autocomplete.run();
  return autocomplete.state.input;
}

export { selecticon };
