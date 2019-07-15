
# Markdown Links

## Preámbulo


Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

Introducción


## Introducción

Necesitas revisar si los links de tus archivos .md estan funcionando correctamente o están rotos?

Con la ayuda de Nodejs hemos creado md.Links con esta herramienta podras busar los archivos .md dentro de tus carpetas y ver la cantidad de links que en ellas se encuentran , ademas de la direccion web y si estan funcionando o no , en caso de no estar funcionando te mostrara el error para que puedas solucionarlo.

Uso
const md-links = require ( 'faog-md-links' ) ;   
CLI (Command Line Interface)

Puedes ejecutar esta librería de la siguiente forma:

Leer archivos con extensión .md
md-links <path-to-file.md>