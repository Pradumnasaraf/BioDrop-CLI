const FaIcons = require("react-icons/fa");
const SaIcons = require("react-icons/si");
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

module.exports = { geticons };
