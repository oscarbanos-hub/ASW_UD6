# Aplicativo de FRONTEND de Formación Global Online

## Endpoints de la API consumidos

El frontend utiliza: `http://localhost:3000/api` (en `resources/js/config.js`).

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/cursos?busqueda=&categoria=&nivel=&limit=` | Listado de cursos con filtros|
| `GET` | `/api/cursos/:id` | Detalle de un curso |
| `GET` | `/api/profesores` | Listado de profesores |
| `GET` | `/api/noticias?limit=3` | Noticias para la portada |
| `GET` | `/api/cursos/:id/comentarios` | Comentarios de un curso |

