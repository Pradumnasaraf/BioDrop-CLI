const fs = require("fs");

// Check if the user has already given a testimonial to the person
async function checktestimonial(testimonialWritter, testimonialReceiver) {
  if (
    fs.existsSync(
      `./data/${testimonialReceiver}/testimonials/${testimonialWritter}.json`
    )
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = checktestimonial;
