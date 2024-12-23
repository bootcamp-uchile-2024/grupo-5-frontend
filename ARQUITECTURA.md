# Componentes de la Aplicación y Puertos que se Utilizan

# Frontend:

1. Tecnologías:
- [React] Biblioteca para construir la interfaz de usuario.
- [Vite] Herramienta de construcción que acelera el desarrollo de la aplicación.
- [Bootstrap] Framework CSS para diseño responsivo y componentes predefinidos.
- [Node.js] Entorno de ejecución JavaScript para ejecutar scripts, servicios y herramientas de desarrollo.
- [Npm] Gestor de paquetes que maneja las dependencias del frontend, como React y Vite.
- [Docker] Virtualización y empaquetador del entorno frontend para que el proyecto sea fácilmente replicable y se pueda ejecutar en cualquier      entorno.

2. Puertos:
- Desarrollo Local: El frontend utiliza el puerto localhost:5173 o cualquier otro puerto definido por Vite durante el desarrollo.
- Comunicación con el Backend: Se realiza a través de solicitudes HTTP o HTTPS usando los métodos estándar (GET, POST, PUT, etc.).

# Backend:

1. Tecnologías:

-[Node.js] Entorno de ejecución para el servidor backend, gestionando las solicitudes HTTP y la lógica de la aplicación.  
-[NestJS] Framework para construir aplicaciones backend escalables y modulares, basado en Node.js.
-[MySQL] Base de datos relacional para almacenamiento de datos.
-[Docker] Virtualización y empaquetador del backend para facilitar el despliegue y la consistencia entre entornos de desarrollo y producción.
-[Flyway] Herramienta para migración de bases de datos en MySQL.
-[AWS] Instancia de servidor donde se desplegará el backend.

2. Puertos:

- El backend se ejecuta en http://107.21.145.167:5001/ durante el desarrollo.

# Arquitectura de Despliegue Local y Productiva

1. Frontend:

- Durante el desarrollo, el frontend se ejecuta en localhost:5173 utilizando Vite.

-La aplicación también se puede ejecutar mediante Docker. Usamos una imagen de Docker que incluye Nginx para simular el entorno productivo.

-El contenedor Docker tiene un archivo Dockerfile que configura el entorno del proyecto de forma consistente, asegurando que todas las dependencias estén instaladas y funcionando.

-Además, la aplicación se puede ejecutar de manera local sin Docker mediante el comando npm run dev, que levanta el servidor de desarrollo y permite trabajar directamente en el proyecto sin necesidad de empaquetado.

2. Backend:

- Se utiliza Docker Compose para orquestar los contenedores de frontend, backend y base de datos en el entorno local.
- La base de datos MySQL puede ejecutarse localmente en un contenedor Docker para emular el entorno de producción.

3. Comunicación:

- El frontend y el backend se comunican a través de una API proporcionada por el backend, que está documentada y accesible mediante Swagger UI. Esta API permite al frontend realizar solicitudes HTTP al backend, interactuando con los distintos endpoints disponibles para el funcionamiento de la aplicación.

# Despliegue Productivo

1. Frontend: El frontend se despliega utilizando una imagen de Nginx dentro de un contenedor Docker para gestionar y servir el contenido estático de la aplicación.

2. Nginx se configura para distribuir el contenido del frontend de manera eficiente y segura en el entorno de producción.

3. El acceso al frontend mediante un dominio público con HTTPS está en proceso de implementación para garantizar una conexión segura para los usuarios.

# Descripción de las Carpeta del Proyecto

/src
  /assets           # Archivos estáticos como imágenes, iconos, fuentes, etc.
  /components       # Componentes reutilizables de React (botones, formularios, carrito, etc.)
  /pages            # Páginas de la aplicación (Home, Perfil de usuarios, etc.)
  /interface        # Contiene los DTOs (Data Transfer Objects), datos que se manejan al interactuar con el backend.
  /layout           # Componentes para la estructura general de la aplicación (header, footer, nav, etc.)
  /states           # Maneja el estado global de la aplicación utilizando contextos de React o librerías como Redux.


[Diagrama de arquitectura](https://imgur.com/a/SPwOq17)
