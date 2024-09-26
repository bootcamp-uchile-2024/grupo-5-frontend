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

    if (login(form)) {
      navigate("/admin");
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
        {!validCredentials && <div className="error-message">Credenciales invalidas</div>}
      </div>
    </div>
  );
};
