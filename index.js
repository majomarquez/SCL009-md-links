#!/usr/bin/env node
const mdLinks = require("./src/md-links.js");
const chalk = require('chalk')
var path = process.argv[2];
// console.log(pathToFile);
mdLinks(path)
.then(res => {
     console.log(chalk.yellow("In this file we found the links"))
   console.log(res)
})
.catch(err => {
  console.log(err);
});