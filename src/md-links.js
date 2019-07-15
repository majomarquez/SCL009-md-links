"use strict"
const fs = require('fs');
const marked =require('marked')
// const path = require('path');
// const chalk = require('chalk')
const FileHound = require('filehound');
const fetch = require('node-fetch');


const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error,stats ) => {
        if (error) {
          return reject(error.message);
        }
         if (stats.isDirectory()) {
          directories(path)
          .then(fileMd=>{
            fileMd.forEach(element => {
              resolve(read(element));
              console.log("console de mdlinks directory",read(element))
            });
          })
          .catch(err=>{
            reject(error)
          })
        }
// si es un archivo
        if (stats.isFile()) {
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

  const directories = (pathToFile) => {
    return new Promise((resolve, reject) => {
      FileHound.create()
        .paths(pathToFile)
        .ext('md')
        .find() 
          .then(files => {
            resolve(files);
            console.log("console de directory", files)
        })
        .catch(error=>{
          reject(error)
        })
        });
      }
  // si fuera un md
  const read = (fileName)=>{   //tomo la funcion declarada que tiene dos parametros 
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
         fetchLinks(links)

        console.log("resultado de links" , links)
      
      });
     });//fin de promesa
  };
  
const fetchLinks =(links=>{
links.map (urlLink=>{
  fetch(urlLink)
  .then(res => {
    console.log("url ok", res.url);
      console.log("uno ok", res.ok);
      console.log("dos ok", res.status);
      console.log("tres ok", res.statusText);
})
  .catch (error =>{
    if (error.code==='ENOTFOUND') {
      console.log ( error.message)
    }
     
  })

})

  });
module.exports = mdLinks;