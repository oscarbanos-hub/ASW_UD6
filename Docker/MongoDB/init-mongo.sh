#!/bin/bash
# Script de carga inicial - importa los JSON de seed

echo "Instalando tools para importar datos d mongodb..."
apt-get update -qq && apt-get install -y -qq mongodb-database-tools > /dev/null 2>&1

echo "Importando datos de los seed en ka basse de datos local..."

mongoimport --uri "mongodb://admin:admin1234@localhost:27017/formacionglobal?authSource=admin" \
  --collection usuarios --jsonArray --file /seed/local.usuarios.json

mongoimport --uri "mongodb://admin:admin1234@localhost:27017/formacionglobal?authSource=admin" \
  --collection profesors --jsonArray --file /seed/local.profesores.json

mongoimport --uri "mongodb://admin:admin1234@localhost:27017/formacionglobal?authSource=admin" \
  --collection cursos --jsonArray --file /seed/local.cursos.json

mongoimport --uri "mongodb://admin:admin1234@localhost:27017/formacionglobal?authSource=admin" \
  --collection comentarios --jsonArray --file /seed/local.comentarios.json

echo "--- Seed cargado correctamente ---"
