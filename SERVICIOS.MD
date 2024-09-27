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

**Ruta local:** http://localhost:5173/home
