
# Markdown Links

## Preámbulo

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

## Introducción

Necesitas revisar si los links de tus archivos .md estan funcionando correctamente o están rotos?

Con la ayuda de Nodejs hemos creado md.Links con esta herramienta podras busar los archivos .md dentro de tus carpetas y ver la cantidad de links que en ellas se encuentran , ademas de la direccion web y si estan funcionando o no , en caso de no estar funcionando te mostrara el error para que puedas solucionarlo.

## Uso e Instalación

npm i md-linksmjm

# Como usar
En un archivo .js debes agregar:

const mdlinks = require('mdlinks'); 

En la terminal:

md-links <path-to-file> 
CLI (Command Line Interface)

Si necesitas buscar dentro de un directorio entonces ingresa el siguiente comando en la terminal
md-links <path-to-directory>


Si ya sabes el nombre del archivo md  entonces ingresa el siguiente comando en la terminal
md-links <path-to-file>
se mostrara 
file: (archivo o ruta donde fue encontrado el link.)
href: (direccion del link.)
text: (descripción del link)

Luego se imprimiràn  
Web: la direccion del link
this Link is Working  (Si el link se encuentra funcionando)
His status is 200 OK  (El status de la Web) 

En caso que el link no se encuentre funcionando encontraras la siguiente informacion:

This link is not working... FIX IT!! 
request to https://es.widia.org/wiki/Markdown failed, reason: getaddrinfo ENOTFOUND es.widia.org


