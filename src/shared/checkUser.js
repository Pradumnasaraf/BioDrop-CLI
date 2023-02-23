const axios = require("axios");

// checks if user exists on github
async function checkUser(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = checkUser;
