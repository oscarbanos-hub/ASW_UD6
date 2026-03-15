# Aplicativo de Formación Global Online

Este proyecto implementa una plataforma de formación online donde los usuarios pueden consultar cursos, ver información detallada y dejar comentarios.
La aplicación sigue una arquitectura full-stack basada en Node.js, Express y MongoDB, utilizando MVC, API REST, sesiones con cookies y AJAX.

El contenido del sitio se genera dinámicamente desde la base de datos, sustituyendo las páginas estáticas desarrolladas en las UD anteriores.

---

## Backend

Implementado con Node.js + Express + MongoDB (Mongoose) siguiendo arquitectura MVC.

Contiene:

Modelos de datos (Mongoose)

Controladores

Rutas REST

Middlewares de autenticación y autorización

Gestión de sesiones con cookies

Sanitización de comentarios

Documentación de la API con Swagger

Principales funcionalidades del backend:

Registro y login de usuarios

Gestión de sesiones

Roles de usuario (admin y alumno)

API REST para cursos, usuarios, comentarios y noticias

Protección de rutas mediante middleware

Documentación interactiva de la API con Swagger

## Frontend

El frontend mantiene el diseño realizado en la UD4 utilizando:

HTML

CSS

Bootstrap

JavaScript

AJAX

La información ahora se obtiene desde la API del backend, permitiendo:

Listado dinámico de cursos

Filtros de búsqueda por categoría y nivel

Visualización de cursos individuales

Visualización de comentarios

Envío de comentarios si el usuario está autenticado

## Docker

Aquí tenemos un `docker-compose.yml` que contiene los servicios necesarios para levantar el aplicativo. De momento contamos con:

- **mongodb**: Base de datos NoSQL para almacenar la información de los cursos, usuarios, etc.

### Requisitos previos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- [Docker](https://docs.docker.com/get-docker/) 

### Comandos
Abrimos PowerShell en la carpeta Docker y ejecutamos el comando que necesitemos:

| Acción | Comando |
|---|---|
| Levantar los servicios | `docker compose up -d` |
| Parar los servicios | `docker compose down` |
| Parar y eliminar volúmenes (borra datos) | `docker compose down -v` |

### Conexión a la base de datos

```
MONGODB_URI=mongodb://admin:admin1234@localhost:27017/globalonline?authSource=admin
```

### Ejecución del proyecto

1. Levantar la base de datos

Abrir PowerShell en la carpeta Docker y ejecutar:

docker compose up -d

Esto iniciará el contenedor de MongoDB.

Para detenerlo:

docker compose down

Para detenerlo y eliminar los datos:

docker compose down -v

2. Configurar variables de entorno

En la carpeta Backend se debe crear un archivo .env con la siguiente configuración:

PORT=3000
MONGODB_URI=mongodb://admin:admin1234@localhost:27017/globalonline?authSource=admin
SESSION_SECRET=clave_secreta

3. Ejecutar el backend

Desde la carpeta Backend:

npm install
npm run dev

El servidor se ejecutará en:

http://localhost:3000


### Documentación de la API

La documentación de la API está disponible mediante Swagger en:

http://localhost:3000/api-docs

Desde esta interfaz es posible probar los endpoints de la API.


### Observaciones

El proyecto está pensado para ejecutarse en local.
La base de datos se levanta mediante Docker y el backend se ejecuta con Node.js.
