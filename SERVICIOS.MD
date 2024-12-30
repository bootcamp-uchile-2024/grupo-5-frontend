# Proyecto E-commerce Petropolis

# DTOs para la Gestión de Usuarios, Mascotas y Productos

Este documento describe las interfaces de los objetos de transferencia de datos (DTOs) utilizados en la gestión de usuarios, mascotas y productos en el sistema. Estas interfaces definen la estructura de los datos que se intercambian entre el frontend y el backend.

## 1. CreateUsuarioDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para la creación de un usuario en el sistema.

- **Ruta**: `src/dtos/CreateUsuarioDto.ts`
- **Propiedades**:
  - `idUsuario` (`number`): Identificador único del Usuario. Ejemplo: `1`
  - `rut` (`string`): Rut del Usuario en formato string. Ejemplo: `12345678-9`
  - `nombres` (`string`): Nombres del Usuario. Ejemplo: `Juan`
  - `apellidos` (`string`): Apellidos del Usuario. Ejemplo: `Pérez`
  - `email` (`string`): Correo electrónico del Usuario. Ejemplo: `juan.perez@gmail.com`
  - `chkTerminos` (`boolean`): Aceptación de términos y condiciones. Ejemplo: `true`
  - `chkOfertas` (`boolean`): Aceptación de ofertas promocionales. Ejemplo: `true`
  - `activo` (`boolean`): Estado del Usuario. Ejemplo: `true`
  - `avatar` (`object`): Información del avatar del Usuario.
    - `idImagenAvatar` (`number`): ID de la imagen del avatar. Ejemplo: `1`
    - `pathImaUsuario` (`string`): Ruta del archivo de imagen del avatar. Ejemplo: `AvatarUsuario1.png`



## 2. CreateMascotaDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para la creación de una mascota en el sistema.

- **Ruta**: `src/dtos/CreateMascotaDto.ts`
- **Propiedades**:
  - `rutUsuario` (`string`): Rut de Usuario. Ejemplo: `10234945-K`
  - `idMascota` (`number`): Id Mascota. Ejemplo: `23535`
  - `nombre` (`string`): Nombre de la Mascota. Ejemplo: `Snoopy`
  - `categoria` (`string`): Categoria de la Mascota. Ejemplo: `Perro`
  - `edad` (`number`): Edad de la Mascota. Ejemplo: `3`
  - `raza` (`string`): Raza de la Mascota. Ejemplo: `Beagle`
  - `imagen` (`string`): Imagen de la Mascota. Ejemplo: `./images/Snoopy.jpg`
  - `afeccionesSalud` (`string[]`): Afecciones de la Mascota. Ejemplo: `["Rabia", "Tiña"]`
  - `preferencias` (`string[]`): Preferencias de la Mascota. Ejemplo: `["ProPlan", "RoyalCanin"]`

## 3. CreateProductoDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para la creación de un producto en el sistema.

- **Ruta**: `src/dtos/CreateProductoDto.ts`
- **Propiedades**:
  - `nombreProducto` (`string`): Nombre del Producto. Ejemplo: `Proplan Cachorro`
  - `idMarca` (`string`): Marca del Producto. Ejemplo: `Royal Canin`
  - `sku` (`string`): SKU del Producto. Ejemplo: `ATRC1927`
  - `precio` (`number`): Precio del Producto. Ejemplo: `54000`
  - `stock` (`number`): Stock del Producto. Ejemplo: `1200`
  - `peso` (`string`): Peso del Producto. Ejemplo: `12 Kg`
  - `tamanio` (`string`): Tamaño del Producto. Ejemplo: `15 Kg`
  - `ingredientes` (`string`): Ingredientes del Producto. Ejemplo: `Arcilla aglutinante`
  - `material` (`string`): Materiales del Producto. Ejemplo: `Arcilla aglutinante.`
  - `imagenes` (`string[]`): Imágenes del Producto Ejemplo: `List ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAYRXhpZgAATU0AKgAAAAgAA1IBAAEA" ]`
  - `idCategoria` (`number`): Categoria del Producto Ejemplo: `Alimento Seco Perros`
  - `activo` (`number`): Estado del Producto. Ejemplo: `1`

## 4. CreatePedidoDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para la creación de un pedido en el sistema.
**Propiedades**:
  - `idPedido` (`number`): ID del pedido. Ejemplo: `10`
  - `idUsuario` (`number`): ID del usuario que realiza el pedido. Ejemplo: `10`
  - `detalles` (`DetallePedidoDto[]`): Detalles del pedido. Ejemplo:

## 5. DetallePedidoDto

**Descripción**: Esta interfaz define los detalles individuales de un pedido.
**Propiedades**:
  - `idpedido` (`number`): ID del pedido. Ejemplo: `1`
  - `iddetallepedido` (`number`): ID del detalle del pedido. Ejemplo: `1001`
  - `idProducto` (`number`): ID del producto en el pedido. Ejemplo: `10`
  - `cantidad` (`number`): Cantidad de productos en el detalle del pedido. Ejemplo: `2`
  - `precio` (`number`): Precio unitario del producto. Ejemplo: `1500`

## 6. RegisterClienteDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para registrar un usuario en el sistema.
**Propiedades**:
  - `rutUsuario` (`string`): RUT del Usuario. Ejemplo: `12345678-9`
  - `contrasena` (`string`): Contraseña del Usuario. Ejemplo: `contrasena123`
  - `nombres` (`string`): Nombres del Usuario. Ejemplo: `Juan`
  - `apellidos` (`string`): Apellidos del Usuario. Ejemplo: `Pérez`
  - `correoElectronico` (`string`): Correo Electrónico del Usuario. Ejemplo: `juan.perez@gmail.com`
  - `telefono` (`string`): Teléfono del Usuario. Ejemplo: `56912345678`
  - `chkOfertas` (`boolean`): Check de Ofertas al crear el Usuario. Ejemplo: `true`

## 7. RegisterInvitadoDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para registrar un invitado en el sistema.
**Propiedades**:
  - `rutUsuario` (`string`): RUT del Usuario. Ejemplo: `12345678-9`
  - `nombres` (`string`): Nombres del Usuario. Ejemplo: `Juan`
  - `apellidos` (`string`): Apellidos del Usuario. Ejemplo: `Pérez`
  - `correoElectronico` (`string`): Correo Electrónico del Usuario. Ejemplo: `juan.perez@gmail.com`
  - `telefono` (`string`): Teléfono del Usuario. Ejemplo: `56912345678`


## 8. UpdateClienteDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para actualizar un cliente en el sistema.
**Propiedades**:
  - `rutUsuario` (`string`): RUT del Usuario. Ejemplo: `12345678-9`
  - `nombre` (`string`): Nombre del Usuario. Ejemplo: `Juan`
  - `apePaterno` (`string`): Apellido Paterno del Usuario. Ejemplo: `Pérez`
  - `apeMaterno` (`string`): Apellido Materno del Usuario. Ejemplo: `González`
  - `correoElectronico` (`string`): Correo Electrónico del Usuario. Ejemplo: `juan.perez@gmail.com`
  - `telefono` (`string`): Teléfono del Usuario. Ejemplo: `56912345678`
  - `rolUsuario` (`string`): Rol del Usuario. Ejemplo: `Cliente`

## 9. EliminaUsuarioDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para eliminar un usuario del sistema.
**Propiedades**:- 
  - `rut` (`string`): RUT del usuario a eliminar. Ejemplo: `12345678-9`

## 10. ActivaUsuarioDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para activar o desactivar un usuario en el sistema.
**Propiedades**:
  - `rut` (`string`): RUT del usuario. Ejemplo: `12345678-9`
  - `activo` (`boolean`): Estado de activación del usuario. Ejemplo: `true`

## 11. CredencialesDto

**Descripción**: Esta interfaz define la estructura de las credenciales necesarias para la autenticación de un usuario.
**Propiedades**:
  - `usuario` (`string`): Nombre de usuario. Ejemplo: `juan.perez`
  - `password` (`string`): Contraseña del usuario. Ejemplo: `password123`

## 12. EjemploDto

**Descripción**: Esta interfaz define la estructura para el manejo de la información y autenticación en el sistema.
**Propiedades**:
 - `info` (`string`): Información adicional o identificador único. Ejemplo: `12345678asdfghjk`
 - `jwt` (`string`): Token JWT utilizado para la autenticación. Ejemplo: `123456`

## 13. CreateDireccionDto
**Descripción**: Esta interfaz define la estructura para la creación de una dirección asociada a un usuario.
**Propiedades**:
- `idUsuario` (`number`): Identificador único del usuario. Ejemplo: `101`
- `idComuna` (`number`): Identificador de la comuna. Ejemplo: `5109`
- `alias` (`string`): Alias para la dirección. Ejemplo: `Casa Playa`
- `calle` (`string`): Nombre de la calle. Ejemplo: `Los Pinos`
- `numero` (`string`): Número de la dirección. Ejemplo: `123`
- `referencias` (`string`): Información adicional sobre la dirección. Ejemplo: `1309A`
- `personaContacto` (`string`): Persona de contacto para la dirección. Ejemplo: `Juan Perez`
- `telefonoContacto` (`string`): Teléfono de contacto. Ejemplo: `56912345678`

## 14. UpdateDireccionDto
**Descripción**: Esta interfaz define la estructura para la actualización de una dirección asociada a un usuario.
**Propiedades**:
 - `idComuna` (`number`): Identificador de la comuna. Ejemplo: `13203`
 - `alias` (`string`): Alias para la dirección. Ejemplo: `Casa Playa`
 - `calle` (`string`): Nombre de la calle. Ejemplo: `Los Pinos`
 - `numero` (`string`): Número de la dirección. Ejemplo: `123`
 - `referencias` (`string`): Información adicional sobre la dirección. Ejemplo: `1309A`
 - `personaContacto` (`string`): Persona de contacto para la dirección. Ejemplo: `Juan Perez`
 - `telefonoContacto` (`string`): Teléfono de contacto. Ejemplo: `56912345678`

## 15. CreateComunaDto
**Descripción**: Esta interfaz define la estructura para la creación de una comuna en el sistema.
**Propiedades**:
- `idComuna` (`number`): Identificador único de la comuna. Ejemplo: `3000`
- `idRegion` (`number`): Identificador de la región a la que pertenece la comuna. Ejemplo: `1`
- `nombreComuna` (`string`): Nombre de la comuna. Ejemplo: `Santiago`

## 16. UpdateComunaDto
**Descripción**: Esta interfaz define la estructura para la actualización de una comuna en el sistema.
**Propiedades**:
- `idRegion` (`number`): Identificador de la región a la que pertenece la comuna. Ejemplo: `13`
- `nombreComuna` (`string`): Nombre de la comuna. Ejemplo: `Santiago`

## 17. UpdateRegionDto
**Descripción**: Esta interfaz define la estructura para la actualización de una región en el sistema.
**Propiedades**:
- `orden` (`number`): Orden de la región. Ejemplo: `7
- `nombreRegion` (`string`): Nombre de la región. Ejemplo: `Región de Valparaíso`

## 18. ActualizarProductoDto

**Descripción**: Esta interfaz define la estructura para la actualización de un producto en el sistema.
**Propiedades**:
  - `nombreProducto` (`string`): Nombre del producto. Ejemplo: `Royal Canin Cachorro Medium Puppy alimento para perro`
  - `idMarca` (`number`): Identificador de la marca del producto. Ejemplo: `1`
  - `descripcion` (`string`): Descripción del producto. Ejemplo: `Royal Canin Medium Junior es un alimento para cachorros de razas medianas (11 a 25 Kg peso adulto) hasta los 12 meses de edad. Con una combinación exclusiva de nutrientes para garantizar una seguridad digestiva óptima y favorecer el equilibrio de la flora intestinal, con prebióticos, contribuyendo así a mejorar la calidad de las heces.`
  - `sku` (`string`): SKU del producto. Ejemplo: `ATRC1927`
  - `precio` (`number`): Precio del producto en pesos CLP. Ejemplo: `86990`
  - `stock` (`number`): Stock disponible del producto. Ejemplo: `1200`
  - `peso` (`string`): Peso del producto. Ejemplo: `12 Kg`
  - `tamanio` (`string`): Tamaño del producto. Ejemplo: `12 Kg`
  - `ingredientes` (`string`): Ingredientes del producto. Ejemplo: `Arcilla aglutinante.`
  - `material` (`string`): Materiales del producto. Ejemplo: `Arcilla aglutinante.`
  - `imagenes` (`ImagenProducto[]`): Lista de imágenes del producto. Ejemplo: 
  - `idCategoria` (`number`): Identificador de la categoría del producto. Ejemplo: `1`
  - `activo` (`number`): Estado del producto (activo o inactivo). Ejemplo: `1`

## 19. CreateMarcaProductoDto
**Descripción**: Esta interfaz define la estructura para la creación de una nueva marca de producto.
**Propiedades**:
  - `nombreMarca` (`string`): Nombre de la marca del producto. Ejemplo: `Royal Canin`

## 20. UpdateMarcaProductoDto
**Descripción**: Esta interfaz define la estructura para la actualización de una marca de producto.
**Propiedades**:
  - `nombreMarca` (`string`): Nombre de la marca del producto. Ejemplo: `Royal Canin`

## 21. CreateCategoriaProductoDto
**Descripción**: Esta interfaz define la estructura para la creación de una nueva categoría de producto.
**Propiedades**:
  - `nombreCategoria` (`string`): Nombre de la categoría del producto. Ejemplo: `Alimento para Gatos`
  - `descripcionCategoria` (`string`): Descripción de la categoría del producto. Ejemplo: `Alimento para Gatos de todas las edades`

## 22. UpdateCategoriaProductoDto
**Descripción**: Esta interfaz define la estructura para la actualización de una categoría de producto.
**Propiedades**:
  - `nombreCategoria` (`string`): Nombre de la categoría del producto. Ejemplo: `Alimento para Perros`
  - `descripcionCategoria` (`string`): Descripción de la categoría del producto. Ejemplo: `Productos alimenticios para perros`
  - `idCategoria` (`number`): Identificador de la categoría del producto. Ejemplo: `1`

## 23. CreateDescuentoDto
**Descripción**: Esta interfaz define la estructura para la creación de un descuento.
**Propiedades**:
  - `nombreDescuento` (`string`): Nombre del descuento. Ejemplo: `Descuento de Navidad`
  - `descripcionDescuento` (`string`): Descripción del descuento. Ejemplo: `Descuento de Navidad`
  - `porcentajeDescuento` (`number`): Porcentaje del descuento. Ejemplo: `20`
  - `fechaInicio` (`string`): Fecha de inicio del descuento. Ejemplo: `2024-12-20`
  - `fechaFin` (`string`): Fecha de fin del descuento. Ejemplo: `2024-12-31`
  - `estado` (`number`): Estado del descuento. Ejemplo: `1`

## 24. UpdateDescuentoDto

**Descripción**: Esta interfaz define la estructura para la actualización de un descuento.
**Propiedades**:
  - `nombreDescuento` (`string`): Nombre del descuento. Ejemplo: `Descuento de Navidad`
  - `descripcionDescuento` (`string`): Descripción del descuento. Ejemplo: `Descuento de Navidad`
  - `porcentajeDescuento` (`number`): Porcentaje del descuento. Ejemplo: `20`
  - `fechaInicio` (`string`): Fecha de inicio del descuento. Ejemplo: `2024-12-20`
  - `fechaFin` (`string`): Fecha de fin del descuento. Ejemplo: `2024-12-31`
  - `estado` (`number`): Estado del descuento. Ejemplo: `1`


## Catalago de Productos

- **Detalle**: Muestra un listado de productos disponibles<br>
- **Ruta Backend**: http://107.21.145.167:5001/api/producto<br>
- **Ruta Frontend**: http://localhost:5173/catalogo-productos<br>

## Detalles por producto

- **Detalle**: Muestra el detalle de cada producto de acuerdo a su ID<br>
- **Ruta Backend**: http://107.21.145.167:5001/api/producto<br>
- **Ruta Frontend**: http://localhost:5173/catalogo-productos<br>

## Ejemplo de Uso

A continuación, se muestra un ejemplo de cómo importar y utilizar estos DTOs en un servicio.

```typescript
import { CreateUsuarioDto } from "./dtos/CreateUsuarioDto";
import { CreateMascotaDto } from "./dtos/CreateMascotaDto";
import { CreateProductoDto } from "./dtos/CreateProductoDto";

// Ejemplo de implementación
const nuevoUsuario: CreateUsuarioDto = {
  rutUsuario: 10234945,
  contrasena: "Snn00py",
  nombre: "Mamerto",
  apePaterno: "Soto",
  apeMaterno: "Perez",
  correoElectronico: "mamerto.soto@mail.cl",
  telefono: "56944556699",
};

const nuevaMascota: CreateMascotaDto = {
  rutUsuario: "10234945-K",
  nombre: "Snoopy",
  edad: 3,
  raza: "Beagle",
  imagen: "./images/Snoopy.jpg",
  afeccionesSalud: ["Rabia", "Tiña"],
  preferencias: ["ProPlan", "RoyalCanin"],
};

const nuevoProducto: CreateProductoDto = {
  nombre: "Proplan Cachorro",
  descripcion: "Proplan Cachorro de 3 a 12 meses - 15 Kg",
  precio: 54000,
  etiquetas: ["perro", "gato", "cachorro"],
  stock: 1550,
};
```

## Autentificación

**1- Administrador:** El usuario podra autentificarse como administrador a traves de un formulario de ingreso. Este usuario tiene los permisos para acceder al formulario de creación de productos y creación de usuarios.

**Ruta local:** http://localhost:5173/admin

**Interface utilizada:** CreateUsuarioDTO
**Formulario utilizado:** FormularioRegistroUsuario

**Interface utilizada:** CreateProductoDTO
**Formulario utilizado:** FormularioRegistroProducto

**2- Usuario:** El usuario podra autentificarse como Usuario a traves de un formulario de ingreso. Este permisos para acceder a la página home.

**Ruta local:** http://localhost:5173

#

## Redux

**Implementación:**

1. **Configuración de la tienda (store.ts):**

   - Se creó un archivo `store.ts` para configurar la tienda de Redux.
   - Se utilizó `configureStore` de `@reduxjs/toolkit` para crear la tienda.
   - Se añadieron los reducers necesarios, incluyendo `cartSlice`.

2. **Slice del carrito (cartSlice.ts):**
   - Se creó un archivo `cartSlice.ts` para manejar el estado del carrito.
   - Se utilizó `createSlice` de `@reduxjs/toolkit` para definir el slice del carrito.
   - Se definieron las acciones `addToCart`, `removeFromCart`, `clearCart`, y `updateQuantity`.
   - Se implementó la lógica para agregar, eliminar, y actualizar la cantidad de productos en el carrito.
   - Se añadió la persistencia del estado del carrito en `localStorage`.

## Nuevas Páginas

1. **Página de Resumen del Carrito (ResumenPage.tsx):**

   - Se creó una página para mostrar el resumen del carrito de compras.
   - Se utilizó el componente `ResumenCarrito` para mostrar los productos en el carrito, el total y un botón para volver al home.
   - Cambios en Redux Persistencia Mejorada del Carrito: La lógica del cartSlice fue optimizada para garantizar la sincronización con localStorage en cada acción

2. **Componente de Resumen del Carrito (ResumenCarrito.tsx):**
   - Se creó un componente para mostrar los productos en el carrito, el total y un botón para volver al home.
   - Se implementó la lógica para aumentar, disminuir y eliminar productos del carrito.

3. **Página del Home (HomePage.tsx):**
   - Actualización de la Página Home
   - Se implementaron cambios en el diseño para alinearse con las especificaciones entregadas por el equipo de diseño.
   - Se implementaron cambios en el diseño para alinearse con las especificaciones entregadas por el equipo de diseño.
   - Se actualizaron los colores, tipografía, y distribución de elementos para mejorar la experiencia del usuario (UX/UI).

4. **Página de Catálogo (CatalogoPage.tsx):**
  - Se añadieron filtros dinámicos para categoría, precio etc

5. **Página de login (Loginpage.tsx):**
  - Aqui el usuario puede ingresar como invitado o hacer uso de sus datos para logearse

6. **Página de registro de usuario (RegistrodeUsuario.tsx):**
  - Aqui el usuario puede registrarse añadiendo sus datos como el correo, la contraseña entre otros

7. **Perfil de usuario (PerfildeUsuario.tsx):**
  - Aqui el usuario puede modificar sus datos, como las direcciones, la foto de perfil etc


**Frameworks y Herramientas Utilizadas**
- Bootstrap: Utilizado para garantizar un diseño responsivo y profesional en todo el sitio.
- Uso: Componentes predefinidos (botones, formularios, modales).
- Versión: Bootstrap 5.x.

- Docker: Todo el entorno del proyecto se encuentra contenido en Docker para facilitar el desarrollo y la integración continua.
- Dockerfile: Define la configuración del contenedor de la aplicación.
- Docker-compose.yml: Orquestación de contenedores (backend, frontend y base de datos).
