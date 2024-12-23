import { CarroCompra } from "../CarroCompras/CarroCompra";
import { Pedido } from "../CarroCompras/Pedido";
import { Mascota } from "../Mascotas/Mascota";
import { Direcciones } from "./Direcciones";

export interface Usuario{
    idUsuario: number;
    rut: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: number;
    contrasena: string;
    chkTerminos: boolean;
    chkOfertas: boolean;
    activo: boolean;
    idRol: number;
    avatar: number;
    direcciones: Direcciones[];
    pedidos: Pedido[];
    carroCompra: CarroCompra[];
    mascotas: Mascota[];
}