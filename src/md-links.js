"use strict"
const fs = require('fs'); 
const marked =require('marked')
const chalk = require('chalk')
const FileHound = require('filehound');
const fetch = require('node-fetch');

// md link  con parametro de ruta
const mdLinks = (path) => {  
  return new Promise((resolve, reject) => { //devuelve una promesa 
    fs.stat(path, (error,stats ) => {        // metodo stat indica si es un archivo o directorio
        if (error) {
          return reject(error.message);
        }
         if (stats.isDirectory()) {     //si stat es directorio
          directories(path)               // si es directorio llamo a filhound y elresultado se lo paso a readfile(read)
          .then(fileMd=>{          //
            fileMd.forEach(element => {  // element devuelve un arreglo con url y se las doy como parametro al read
              resolve(read(element));
              
            });
          })
          .catch(err=>{
            reject(error)
          })
        }
// si es un archivo
        if (stats.isFile()) {  // si fuera  un archivo llama a read file (read)
          read(path)           
          .then(files => {
              resolve(files);
          })
          .catch(err => {
              reject(err);
          });
        }
    }) // fin de fs.stats
        
   })
}
      
// si es directorio

  const directories = (pathToFile) => { //promesa que retorna el metodo filehound cuyo resultado le pasare a read
    return new Promise((resolve, reject) => {
      FileHound.create()
        .paths(pathToFile)
        .ext('md')
        .find() 
          .then(files => {
            resolve(files);
            
        })
        .catch(error=>{
          reject(error)
        })
        });
      }
  // si fuera un md
  const read = (fileName)=>{   //tomo la funcion declarada 
     return new Promise ((resolve,reject)=>{       //   le digo quela funcion va a retornar una promesa
      fs.readFile(fileName, "utf-8" ,(error, content) =>{   //llamo a la funcion de filesystem
        if (error){
          throw(error)
        }
        let links = [];
        const renderer = new marked.Renderer(); 
        renderer.link = (href, title, text)=> {
          links.push({
            href:href,
            text:text,
            file:fileName 
          });
        };
        marked(content,{renderer:renderer});
         resolve(links);   
         fetchLinks(links);
         console.log("nuevo total"+links.length)

        // console.log(links)
      
      });
     });//fin de promesa
  };
  
const fetchLinks =(links=>{
links.map (urlLink=>{
  fetch(urlLink)
  .then(res => {
    console.log(chalk.magenta( "Web:", res.url));
      console.log(chalk.cyan("this Link is Working "));
      console.log(chalk.cyan("His status is", res.status +" "+ res.statusText));
      
})
  .catch (error =>{
    if (error.code==='ENOTFOUND') {
      console.log (chalk.yellow ("This link is not working... FIX IT!! ")) 
      console.log (chalk.red (error.message))
    }
  })
})
});



 
module.exports = mdLinks;