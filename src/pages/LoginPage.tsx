import { useState } from "react";
import { login } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import '../index.css';

interface IForm {
  user: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(false);
  const [validCredentials, setValidCredentials] = useState<boolean>(true);
  const [form, setForm] = useState<IForm>({
    user: "",
    password: "",
  });

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (form.user === "" || form.password === "") {
      setError(true);
      return;
    }

    const isAuthenticated = login(form);
    
    if (isAuthenticated) {
      // Obtener el usuario desde localStorage después del login exitoso
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const roles = parsedUser.roles;

        // Redirigir a la página correspondiente según el rol
        if (roles.includes("admin")) {
          navigate("/admin");
        } else if (roles.includes("user")) {
          navigate("/home");
        }
      }
    } else {
      setValidCredentials(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError(false);
    setValidCredentials(true);
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <h1>Acceder a tu cuenta</h1>
      <div className="login-card">
        <form>
          <input
            type="text"
            placeholder="Usuario"
            name="user"
            onChange={handleChange}
            value={form.user}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
          <button type="submit" onClick={handleSubmit}>
            Ingresar
          </button>
        </form>
        {error && <div className="error-message">Debes llenar todos los campos</div>}
        {!validCredentials && <div className="error-message">Credenciales inválidas</div>}
      </div>
    </div>
  );
};
