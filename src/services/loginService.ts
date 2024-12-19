import { UsuarioDto } from "../interface/Usuarios/dto/UsuarioDto";

const apiUrl = "http://107.21.145.167:5001/usuarios";

export const login = async (
  rut: string,
  contrasena: string
): Promise<UsuarioDto | null> => {
  try {
    const response = await fetch(`${apiUrl}/${rut}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const usuario: UsuarioDto = await response.json();
    if (usuario.contrasena === contrasena) {
      localStorage.setItem("user", JSON.stringify(usuario));
      return usuario;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
};

export const logout = () => localStorage.removeItem("user");
export const isAuth = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const userHasRole = (roles: string[]) => {
  const user = isAuth();
  return user ? roles.includes(user.rolUsuario) : false;
};
