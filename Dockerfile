# Etapa uno, build o construcción
ARG IMAGEN
ARG ENDPOINT
FROM node:20 AS build

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Verificar la existencia de la carpeta dist
RUN ls -al /usr/app/dist

# Etapa dos, empaquetado con Nginx
FROM nginx:latest

# Copiar los archivos generados desde la etapa de construcción
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Configurar el directorio de trabajo
WORKDIR /usr/share/nginx/html

# ENV VITE_URL_ENDPOINT_BACKEND=http://localhost:3001

# Exponer el puerto 80
EXPOSE 80
