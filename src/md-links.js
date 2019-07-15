"use strict"
const fs = require('fs');
const marked =require('marked')
const path = require('path');
const chalk = require('chalk')
const FileHound = require('filehound');


const mdLinks = (path) => {
  // return new Promise((resolve, reject) => {
    fs.stat(path, (error,stats ) => {
        if (error) {
          return reject(error.message);
        }
         if (stats.isDirectory()) {
          directories(path)
          .then(fileMd=>{
            fileMd.forEach(links => {
              resolve(read(links));
              console.log("console de mdlinks directory",read(links))
            });
          })
          .catch(err=>{
            reject(error)
          })
        }
    })
        if (stats.isFile()) {
          read(path)
          .then(res => {
              resolve(res);
          })
          .catch(err => {
              reject(err);
          });
        }
  // })
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
    // return new Promise ((resolve,reject)=>{       //   le digo quela funcion va a retornar una promesa
      fs.readFile(fileName, "utf-8" ,(error, content) =>{   //llamo a la funcion de filesystem
        if (error){
          throw(error)
        }
        let link = [];
        const renderer = new marked.Renderer();
        renderer.links = (href, title, text)=> {
          links.push({
            href:href,
            text:text,
            file:fileName 
          });
        };
        marked(content,{renderer:renderer});
        // resolve(links);   
        console.log("resultado de links" , links)
      
      });
    // });//fin de promesa
  };
  


module.exports = mdLinks;