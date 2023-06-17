import fs from "fs";

// Check if the user has already given a testimonial to the person
async function checktestimonial(testimonialWriter, testimonialReceiver) {
  if (
    fs.existsSync(
      `./data/${testimonialReceiver}/testimonials/${testimonialWriter}.json`
    )
  ) {
    return true;
  } else {
    return false;
  }
}

export default checktestimonial;
