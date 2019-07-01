"use strict"
const fs = require('fs');
const fetch = require('node-fetch');
const markdownLinkExtractor = require('markdown-link-extractor');
const path = require('path');
const chalk = require('chalk')

// const read = fs.readFileSync ("./Readme.md")// version sincrona de leer un archivo por su ruta
// console.log(read)

// declaracion de la promesa
const read = (fileName, type)=>{   //tomo la funcion declarada que tiene dos parametros 
  return new Promise ((resolve,reject)=>{       //   le digo quelafuncion va a retornar una promesa
    fs.readFile(fileName, type ,(error, content) =>{   //llamo a la funcion de filesystem

    if (error) {
      reject(error)
    }
    else {
      resolve(content) ;
    }
  });
});
}

 // llamada de la promesa
let paths= process.argv[2]
console.log( paths);
 read(paths, "utf-8")
  .then(res => {
    console.log(res)
  })
  .catch (err=>{
    console.log (err);
  })

  var links = markdownLinkExtractor(read);
  links.forEach(function (link) {
    fetch(link)
      .then((res) => {
        if (res.ok){
          console.log (chalk.magenta("This Link is Working status : ") + chalk.cyan (res.status + " " + res.url) )
        }
      })
      .catch(error => {
        console.log ((chalk.yellow ("ERROR CATCHED FIXME!!  ")) + chalk.red(error.message));
      })
})

// Promise.all([read(path, "utf-8")]) //le paso cada una de las declaaraciones de promesas separadas por coma y deuelve una promesa
// .then(res=>{
//   console.log(res[1]);// solome da la respuesta de la promesa numero 1 en este caso readfile
// })
// .catch (err=>{
//   console.log (err);
// })

  



// // exports.readAFile= readAFile;
// // exports.readFilesAndExtractLinks=readFilesAndExtractLinks;

