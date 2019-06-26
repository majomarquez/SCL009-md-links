"use strict"
const fs = require('fs');
const fetch = require('node-fetch');
const markdownLinkExtractor = require('markdown-link-extractor');
const path = require('path');
// const chalk = require('chalk')

// const read = fs.readFileSync ("./Readme.md")// version sincrona de leer un archivo por su ruta
// console.log(read)

  const read = fs.readFile("./Readme.md", "utf-8",(error,datos) => { // se agrega la funcion con 3 parametros , el primero es de error y el segundo la forma en que vere el archivo y el tercero si hay un error
    if (error) {
      reject(error)
    }
    else {
      console.log("En el Archivo solicitado se encuentran los siguientes Links:") 
    }
    })

  const markdown = fs.readFileSync('README.md').toString();
  const links = markdownLinkExtractor(markdown);
  links.forEach(function (infoLinks) {
    fetch(infoLinks)
      .then((res) => {
        if (res.ok){
          console.log ("This Link is Working status : "+ res.status + " " + res.url )
        }
      })
      .catch(error => {
        console.log ("Error Catched FIXME!!  " + error.message)
      })
})


// exports.readAFile= readAFile;
// exports.readFilesAndExtractLinks=readFilesAndExtractLinks;

