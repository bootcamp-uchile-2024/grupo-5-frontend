# Proyecto E-commerce Petropolis

# DTOs para la Gestión de Usuarios, Mascotas y Productos

Este documento describe las interfaces de los objetos de transferencia de datos (DTOs) utilizados en la gestión de usuarios, mascotas y productos en el sistema. Estas interfaces definen la estructura de los datos que se intercambian entre el frontend y el backend.

## 1. CreateUsuarioDto

**Descripción**: Esta interfaz define la estructura de los datos necesarios para la creación de un usuario en el sistema.

- **Ruta**: `src/dtos/CreateUsuarioDto.ts`
- **Propiedades**:
  - `rutUsuario` (`number`): Rut del Usuario. Ejemplo: `10234945-K`
  - `contrasena` (`string`): Contraseña del Usuario. Ejemplo: `Snn00py`
  - `nombre` (`string`): Nombre del Usuario. Ejemplo: `Mamerto`
  - `apePaterno` (`string`): Apellido Paterno del Usuario. Ejemplo: `Soto`
  - `apeMaterno` (`string`): Apellido Materno del Usuario. Ejemplo: `Perez`
  - `correoElectronico` (`string`): Correo Electrónico del Usuario. Ejemplo: `mamerto.soto@mail.cl`
  - `telefono` (`string`): Teléfono del Usuario. Ejemplo: `56944556699`

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
  - `nombre` (`string`): Nombre del Producto. Ejemplo: `Proplan Cachorro`
  - `marca` (`string`): Marca del Producto. Ejemplo: `Royal Canin`
  - `descripcion` (`string`): Descripción del Producto. Ejemplo: `Proplan Cachorro de 3 a 12 meses - 15 Kg`
  - `precio` (`number`): Precio del Producto. Ejemplo: `54000`
  - `etiquetas` (`string[]`): Etiquetas del Producto. Ejemplo: `["perro", "gato", "cachorro"]`
  - `categoria` (`string`): Categoria del Producto Ejemplo: `Alimento Seco Perros`
  - `stock` (`number`): Stock del Producto. Ejemplo: `1550`
  - `ingredientes` (`string`): Ingredientes del Producto. Ejemplo: `Maíz, harina de subproductos de pollo, grasas animales (vacuna y pollo), proteína vegetal purificada (L.I.P._), harina de carne vacuna (L.I.P._), arroz, harina de trigo, pulpa de remolacha, hidrolizado de hígado de pollo, harina de gluten de maíz, sales minerales, aceite de pescado, vitaminas, aceite vegetal (con aceite de borraja), zeolita, levadura de cerveza, L-lisina, fructo-oligosacáridos (FOS), oligoelementos, taurina, DL-metionina, mananooligosacáridos (MOS), oligoelementos quelados, extracto de rosa de la India (rico en luteína). (\*) Low Indigestible Protein: proteína seleccionada por su alta asimilación.
  - `tamanio` (`string`): Tamaño del Producto. Ejemplo: `15 Kg`
  - `origen` (`string`): Origen del Producto. Ejemplo: `Francia`
  - `Vida Útil del Producto` (`string`): Vida Útil del Producto. Ejemplo: `12 meses`
  - `Recomendaciones de Uso` (`string`): Recomendaciones de Uso. Ejemplo: `Solo para cachorros`

## Catalago de Productos

- **Detalle**: Muestra un listado de productos disponibles<br>
- **Ruta Backend**: http://localhost:3000/api/producto<br>
- **Ruta Frontend**: http://localhost:5173/catalogo-productos<br>

## Detalles por producto

- **Detalle**: Muestra el detalle de cada producto de acuerdo a su ID<br>
- **Ruta Backend**: http://localhost:3000/api/producto{id}<br>
- **Ruta Frontend**: http://localhost:5173/catalogo-productos/{id}<br>

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

2. **Componente de Resumen del Carrito (ResumenCarrito.tsx):**
   - Se creó un componente para mostrar los productos en el carrito, el total y un botón para volver al home.
   - Se implementó la lógica para aumentar, disminuir y eliminar productos del carrito.

   Cambios Implementados
Actualización de la Página Home
Diseño Mejorado:

Se implementaron cambios en el diseño para alinearse con las especificaciones entregadas por el equipo de diseño.
Se actualizaron los colores, tipografía, y distribución de elementos para mejorar la experiencia del usuario (UX/UI).
Elementos Nuevos:

Banner Promocional: Se añadió un banner dinámico en la parte superior, destacando ofertas y novedades.
Sección de Productos Destacados: Se incluyó una sección para productos recomendados, categorizados por popularidad y ofertas.
Navegación Mejorada: La barra de navegación ahora incluye accesos rápidos a categorías y búsqueda avanzada.

Cambios en Redux
Persistencia Mejorada del Carrito:

La lógica del cartSlice fue optimizada para garantizar la sincronización con localStorage en cada acción.
Nueva Acción:

Filtrar por Categoría: Permite filtrar productos en el carrito por categoría.
Configuración de la Tienda:

Los reducers adicionales fueron integrados para manejar el estado de la página home y el catálogo de productos.

Nuevas Páginas y Componentes
Página de Inicio (HomePage.tsx):

Se rediseñó la página inicial para reflejar los cambios solicitados por diseño.
Se añadieron nuevas secciones: banner promocional, productos destacados y categorías.
Página de Catálogo (CatalogoPage.tsx):

Se añadieron filtros dinámicos para categoría, precio y popularidad.
Componente de Producto Destacado (ProductoDestacado.tsx):

Componente que muestra productos en una tarjeta con información básica (nombre, precio y enlace a detalles).

Frameworks y Herramientas Utilizadas
Bootstrap:
Utilizado para garantizar un diseño responsivo y profesional en todo el sitio.

Uso: Componentes predefinidos (botones, formularios, modales).
Versión: Bootstrap 5.x.
Docker:
Todo el entorno del proyecto se encuentra contenido en Docker para facilitar el desarrollo y la integración continua.

Archivos clave:
Dockerfile: Define la configuración del contenedor de la aplicación.
docker-compose.yml: Orquestación de contenedores (backend, frontend y base de datos).
