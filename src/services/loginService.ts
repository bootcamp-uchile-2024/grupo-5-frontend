import { UsuarioDto } from "../interface/Usuarios/dto/UsuarioDto";

const apiUrl = "http://107.21.145.167:5001/auth/login";

export const login = async (
  email: string,
  password: string
): Promise<UsuarioDto | null> => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({ usuario: email, password }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const token = await response.text();
    const user = parseJwt(token);

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
};

const parseJwt = (token: string): UsuarioDto | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuth = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const userHasRole = (roles: string[]) => {
  const user = isAuth();
  return user ? roles.includes(user.rolUsuario) : false;
};
