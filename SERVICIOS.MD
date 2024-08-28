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
  - `nombre` (`string`): Nombre de la Mascota. Ejemplo: `Snoopy`
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
  - `descripcion` (`string`): Descripción del Producto. Ejemplo: `Proplan Cachorro de 3 a 12 meses - 15 Kg`
  - `precio` (`number`): Precio del Producto. Ejemplo: `54000`
  - `etiquetas` (`string[]`): Etiquetas del Producto. Ejemplo: `["perro", "gato", "cachorro"]`
  - `stock` (`number`): Stock del Producto. Ejemplo: `1550`

## Ejemplo de Uso

A continuación, se muestra un ejemplo de cómo importar y utilizar estos DTOs en un servicio.

```typescript
import { CreateUsuarioDto } from './dtos/CreateUsuarioDto';
import { CreateMascotaDto } from './dtos/CreateMascotaDto';
import { CreateProductoDto } from './dtos/CreateProductoDto';

// Ejemplo de implementación
const nuevoUsuario: CreateUsuarioDto = {
  rutUsuario: 10234945,
  contrasena: 'Snn00py',
  nombre: 'Mamerto',
  apePaterno: 'Soto',
  apeMaterno: 'Perez',
  correoElectronico: 'mamerto.soto@mail.cl',
  telefono: '56944556699'
};

const nuevaMascota: CreateMascotaDto = {
  rutUsuario: '10234945-K',
  nombre: 'Snoopy',
  edad: 3,
  raza: 'Beagle',
  imagen: './images/Snoopy.jpg',
  afeccionesSalud: ['Rabia', 'Tiña'],
  preferencias: ['ProPlan', 'RoyalCanin']
};

const nuevoProducto: CreateProductoDto = {
  nombre: 'Proplan Cachorro',
  descripcion: 'Proplan Cachorro de 3 a 12 meses - 15 Kg',
  precio: 54000,
  etiquetas: ['perro', 'gato', 'cachorro'],
  stock: 1550
};
```