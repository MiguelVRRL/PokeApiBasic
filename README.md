<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# ejecutar en desarrollo

1.clonar el repositorio 

2.ejecutar
```
yarn install
```
3.tener nest cli instalado
```
npm i -g @nestjs/cli
```

4.levantar la base de datos
```
docker-compose up -d
```

5.clonar el __.env.template__ y renombrar a __.env__

6.llenar las variables de entorno en el __.env__

7.ejecutar la app en modo desarrolo:
```
yarn run start:dev
```

8.reconstruir la base de datos:
```
http://localhost:3000/api/v2/seed
```
# Stack usado

* Nest

* MongoDB

# Levantar docker

* ejecutar
```
systemctl start docker
```


# Production Build
1.Crear el archivo .env.prod

2.Llenar las variables de entorno de prod

3.buildear la nueva imagen:
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
 ```