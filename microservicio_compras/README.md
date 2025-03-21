# Trabajo B - AST
models/Disfraz.js es la ruta que contiene el modelo de los documentos a trabajar

routes/disfraces.js contiene las rutas de crud de los modelos de los documentos Disfraz.js

el .env contiene la URI de la BD de mongo que utilizaremos, la llamaremos disfracesDB
*****************************************************************************
server.js lanza a comunicacion entre mongo y 
express, es recomendable comprobar que el puerto
 a usar no esta siendo usado por otra instancia 
 del propio servidor usando :
 "sudo lsof -i :3000"
 y posteriormente :
 "sudo kill -9 P_ID" 
 matamos el proceso en ese puerto 
 y podremos volver a 
 ejecutar "node server.js"
******************************************************************************
 en la linea de comandos, cuando queramos hacer un POST
 para añadir algo a la base de datos
 usaremos : "
curl -X POST http://localhost:3000/api/disfraces \
     -H "Content-Type: application/json" \
     -d '{"nombre": "pirata", "marca": "hasbro", "cantidad": 10, "precio": 29.99}'
"
*****************************************************************************
si queremos hacer un GET:
"
curl -X GET http://localhost:3000/api/disfraces
"
****************************************************************************
si queremos un UPDATE(comando PUT):
"
curl -X PUT http://localhost:3000/api/disfraces/ID_DEL_DISFRAZ \
     -H "Content-Type: application/json" \
     -d '{"nombre": "pirata actualizada", "marca": "hasbro", "cantidad": 12, "precio": 35.99}'
"(CAMBIANDO LA ID_DEL_DISFRAZ por la id previamente conseguida con el get)
*****************************************************************************
Si queremos ELIMINAR algo(comando DELETE):
"
curl -X DELETE http://localhost:3000/api/disfraces/ID_DEL_DISFRAZ
"
******************************************************************************

RESUMEN DE LAS RUTAS:
POST /api/disfraces: Crear un nuevo disfraz.
GET /api/disfraces: Obtener todos los disfraces.
GET /api/disfraces/:id: Obtener un disfraz por ID.
GET /api/disfraces/:tipo: Obtener un disfraz por tipo.
PUT /api/disfraces/:id: Actualizar un disfraz por ID.
DELETE /api/disfraces/:id: Eliminar un disfraz por ID.

***********************************
Comienzo de angular:
He utilizado :
ng new cliente
cd cliente
ng serve --open
esto genera el cleinte y su src/app

despues usando estos comandos:

ng generate component components/disfraz-list
ng generate component components/disfraz-form
ng generate service services/disfraz

se crea la los componentes y un servicio

aseguro las dependencias:

npm install @angular/common @angular/core @angular/router --legacy-peer-deps


*********************************************************************************
__v es un campo de versión que Mongoose usa para controlar cambios en los documentos.
