const FaIcons = require("react-icons/fa");
const SaIcons = require("react-icons/si");
const { AutoComplete } = require("enquirer");
const chalk = require("chalk");
let icons = [];

async function geticons() {
  Object.keys(FaIcons).forEach((key) => {
    icons.push(key);
  });

  Object.keys(SaIcons).forEach((key) => {
    icons.push(key);
  });

  return icons;
}

async function selecticon() {
  const autocomplete = new AutoComplete({
    name: "icon",
    message: "Select an icon (Start typing to find matching icons)",
    limit: 10,
    choices: geticons(),
    highlight: function (value, choice) {
      return chalk.green(value);
    },
  });
  await autocomplete.run();
  return autocomplete.state.input;
}

module.exports = {
  selecticon,
};
