const axios = require("axios");
let icons = [];
async function geticons() {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/EddieHubCommunity/LinkFree/main/config/icons.json`
    );
    icons = Object.keys(response.data);
    return icons;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  geticons,
};
