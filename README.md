# Readme
## _Aeromexico Test_

En este test se crea una aplicación para ver un listado de personajes de la serie de películas Harry Potter, en el cual se pueden filtrar los personajes, agregar como favoritos y agregar nuevos personajes.

## requerimientos
Para poder levantar el proyecto se requieren de las siguientes versiones iguales o posteriores de node y npm

```sh
node --version
v14.15.4
npm --version
7.17.0
```

## Instalación
Se requiere de json-server para poder levantar el proyecto, por lo que se debe ejecutar el siguiente comando:

```sh
npm install -g json-server
yarn install -g json-server
```

El siguiente paso en instalar las dependencias del proyecto con el siguiente comando

```sh
npm install
yarn install
```

Una vez instalado, primero levantamos el servicio para que los archivos json puedas ser accesibles. Es importante que sea en el puerto 3004, ya que la aplicación se iniciara en el puerto 3000

```sh
json-server --watch ./src/json/characters.json --port 3004
```

Después iniciamos nuestra aplicación

```sh
npm start
yarn start
```

Si al compilar surge algún error podemos ejecutar este comando para poder iniciar la aplicación sin problemas

```sh
rm -rf node_modules && rm -rf package-lock.json && npm install
rm -rf node_modules && rm -rf yarn.lock && npm install
```

## Que es lo que más me gusto de este desarrollo

A pesar de que es sólo es un test, siempre me ha gustado realizar este tipo de mini proyectos. Me gusto mucho el uso de json-server, por que nunca lo había utilizado y es una herramienta muy útil para realizar testeos sin necesidad de un API completo, me ayudo a reforzar los conocimientos y a conocer alternativas nuevas en el desarrollo, además siempre me han gustado las películas de Harry Potter y disfrute mucho el realizar este test

## Que hubiera mejorado con más tiempo

Hubiera agregado un pequeño cuestionario para saber a qué personaje de la saga te pareces con la posibilidad de poderlo compartir con tus amigos.

## Pain Point

Al trabajar con json-server observe que trabaja con una propiedad id que el json de personajes tiene, por o cuál tuve que inicializar cada objeto con esta propiedad.