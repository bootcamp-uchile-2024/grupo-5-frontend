# Etapa uno, build o construcción
ARG IMAGEN
ARG ENDPOINT
FROM node:20 AS build

WORKDIR /usr/app

# Definir la variable de entorno
ENV VITE_API_URL=http://107.21.145.167:5001

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Verificar la existencia de la carpeta dist
RUN ls -al /usr/app/dist

# Etapa dos, empaquetado con Nginx
FROM nginx:alpine

# Copiar los archivos generados desde la etapa de construcción
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Configurar el directorio de trabajo
WORKDIR /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80