#!/usr/bin/env node
const mdLinks = require("./src/md-links.js");
var path = process.argv[2];
mdLinks(path)
.then(res => {
  
   console.log("console de index", res)
})
.catch(err => {
  console.log(err);
});