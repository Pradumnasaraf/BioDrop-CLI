#! /usr/bin/env node

const chalk = require("chalk");
const { prompt } = require("enquirer");
const fs = require("fs");
const createUser = require("./util/createUser");


console.log(
  chalk.bgGreen.bold(
    ` welcome to linkfree-cli`  )
);


function start() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is your GitHub username (Case Sensitive)?",
    },
  ])
    .then((answers) => {
      const GHUsername = answers.name;
      if (fs.existsSync(`./public/data/${GHUsername}.json`)) {
        console.log(
          chalk.bgYellow.bold(
            ` File with ${answers.name}.json already exists, your data will be updated ! `  
          )
        );
       
      } 
      else
      {
        console.log(
          chalk.bgYellow.bold(
            ` creating ${answers.name}.json ... ! `  
          )
        );
      }

        checkUser(GHUsername).then((result) => {
          if (result === true) {
            questions(GHUsername);
          } else {
            console.log(
              chalk.bgRed.bold(
                ` User with username ${GHUsername} does not exist on GitHub, try again! `
              )
            );
            start();
          }
        });
      
    })
    .catch((error) => {
      console.log(error);
    });
}

//print questions to users
function questions(username) {
  prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "select",
      name: "type",
      message: "Your profile type?",
      choices: ["Personal", "Community"],
    },
    {
      type: "input",
      name: "bio",
      message: "Add a short bio about yourself",
    },
  ])
    .then((answers) => {
      createUser(username, answers);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function checkUser(username) {
  const axios = require("axios");
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


//start linkfree-cli
start();
