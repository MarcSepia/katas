#!/bin/bash

clear

npm install

clear

# Construir la imagen de Docker
docker build -t refactor-carrito-compra .

# Ejecutar los tests con la imagen de Docker
docker run refactor-carrito-compra