import enquirer from "enquirer";
let testimonials = [];

async function addtestimonials(bool) {
  while (bool) {
    let answers = await enquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Who gave the testimonial?(write their username)",
      },
      {
        type: "confirm",
        name: "addTestimonial",
        message: "Do you want to add another testimonial?",
      },
    ]);
    testimonials.push(answers.name);
    if (!answers.addTestimonial) {
      return testimonials;
    }
  }
}

async function removetestimonials(testimonials) {
  let choiceTestimonials = testimonials;
  let stop = false;
  while (!stop) {
    const answers = await enquirer.prompt([
      {
        type: "select",
        name: "testimonial",
        choices: choiceTestimonials,
        message: "Choose which one you want to remove",
      },
    ]);
    choiceTestimonials = choiceTestimonials.filter(
      (testimonial) => testimonial.name !== answers.testimonial
    );
    if (choiceTestimonials.length !== 0) {
      const res = await enquirer.prompt([
        {
          type: "confirm",
          name: "removeTestimonial",
          message: "Do you want to remove another testimonial?",
        },
      ]);
      if (!res.removeTestimonial) {
        let result = [];
        choiceTestimonials.map((testimonial) => {
          const { name } = testimonial;
          result.push(name);
        });
        return result;
      }
    } else {
      return [];
    }
  }
}

async function updatetestimonials(testimonials) {
  let choiceTestimonials = testimonials;
  let stop = false;
  while (!stop) {
    const answers = await enquirer.prompt([
      {
        type: "select",
        name: "testimonial",
        choices: choiceTestimonials,
        message: "Choose which one you want to update",
      },
    ]);
    const { name, updateTestimonial } = await enquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the new username?",
      },
      {
        type: "confirm",
        name: "updateTestimonial",
        message: "Do you want to update another testimonial?",
      },
    ]);
    choiceTestimonials.map((testimonial) => {
      if (testimonial.name === answers.testimonial) {
        testimonial.name = name;
      }
    });
    if (!updateTestimonial) {
      let result = [];
      choiceTestimonials.map((testimonial) => {
        const { name } = testimonial;
        result.push(name);
      });
      return result;
    }
  }
}

export { addtestimonials, removetestimonials, updatetestimonials };
