# Aplicativo de Formación Global Online

Este es el proyecto del aplicativo de formación Global Online, que proporciona una plataforma con un catálogo de cursos.

---

## Backend

*todavía nada**
## Frontend

*todavía nada**

## Docker

Aquí tenemos un `docker-compose.yml` que contiene los servicios necesarios para levantar el aplicativo. De momento contamos con:

- **mongodb**: Base de datos NoSQL para almacenar la información de los cursos, usuarios, etc.

### Requisitos previos

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
