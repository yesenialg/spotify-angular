## Spotify-angular
Este es un proyecto de aprendizaje que se construyó en el curso de Udemy [Angular desde cero a experto: Crear una aplicación real](https://www.udemy.com/certificate/UC-9d3f9d9d-d589-4a3a-a837-295d2845b583)

### Inicializar proyecto

Para inicializar este frontend, primero debes descargar [esta api](https://github.com/leifermendez/node-api-tracks) que es la que consume este proyecto, y crear un archivo .env con las siguientes variables:


```
DB_URI=
PORT=3001
JWT_SECRET=Secreto01
URL_PUBLIC='http://localhost:3001'
```

Hacer `npm i` en ambos proyectos (Api y frontend) e inicializar con `node app.js` en api y con `ng s --host=0.0.0.0` este frontend (con el --host=0.0.0.0 podemos acceder al proyecto desde cualquier dispositivo que esté en la misma red)