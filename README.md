# Pet-tacular

Este proyecto es una aplicación web desarrollada con React, TypeScript y Vite. La aplicación es un e-commerce de productos para animales.

## Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Ejecución en Entorno de Desarrollo](#ejecución-en-entorno-de-desarrollo)
4. [Compilación y Despliegue en Producción](#compilación-y-despliegue-en-producción)
5. [Credenciales de Acceso](#credenciales-de-acceso)
6. [Scripts Disponibles](#scripts-disponibles)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (versión 6 o superior)
- [React](https://react.dev/): Utilizado como la biblioteca principal para construir la interfaz de usuario.
- [Vite](https://vitejs.dev/): Para servir y construir el proyecto de manera rápida y eficiente.
- [Bootstrap](https://getbootstrap.com/): Si no está incluido como CDN, asegúrate de que esté instalado como dependencia del proyecto.
- [Docker](https://www.docker.com/): Requerido si se utilizan contenedores para desarrollo o despliegue.

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio:**

    ```sh
    git clone https://github.com/bootcamp-uchile-2024/grupo-5-frontend.git
    ```

2. **Navega al directorio del proyecto:**

    ```sh
    cd grupo-5-frontend
    ```

3. **Instala las dependencias:**

    ```sh
    npm install
    ```

4. **Instala Bootstrap (si no está incluido como CDN):**

    ```sh
    npm install bootstrap
    ```

5. **Configura Docker (opcional):**

    Si usas Docker para levantar el entorno, asegúrate de tener un archivo `Dockerfile` y/o `docker-compose.yml` configurado. Ejecuta:

    ```sh
    docker-compose up
    ```

---
## Ejecución en Entorno de Desarrollo

Para iniciar la aplicación en modo desarrollo, sigue estos pasos:

1. **Configura las variables de entorno:**

    Crea un archivo `.env` en la raíz del proyecto con las siguientes configuraciones básicas:

    ```env
    VITE_API_URL=http://localhost:3000
    ```

2. **Ejecuta el servidor de desarrollo:**

    ```sh
    npm run dev
    ```

3. **Accede a la aplicación:**

    La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---
## Compilación y Despliegue en Producción

Para compilar e instalar la aplicación en un entorno de producción, sigue estos pasos:

1. **Construye la aplicación:**

    ```sh
    npm run build
    ```

    Esto generará un directorio `dist` con los archivos estáticos optimizados para producción.

---
## Credenciales de Acceso

Utiliza las siguientes credenciales para acceder a la aplicación:

#### Usuario:

* Usuario: `user`
* Password: `user`

#### Administrador:

* Usuario: `admin`
* Password: `admin`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para encontrar y arreglar problemas en el código.

