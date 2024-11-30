export interface UsuarioDto{
    rut: string;
    contrasena: string;
    nombreUsuario: string;
    apePaterno: string;
    apeMaterno: string;
    correoElectronico: string;
    telefono: string;
    rolUsuario: UserRole;

}

export enum UserRole {
    ADMINISTRADOR = 'Administrador',
    MANAGER = 'Manager',
    USUARIO = 'Usuario',
    INVITADO = 'Inivitado',
  }