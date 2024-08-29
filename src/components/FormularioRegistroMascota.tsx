import React, { useState } from "react";
import { CreateMascotasDto } from "../interface/CreateMascotaDTO";

const FormularioRegistroMascota: React.FC = () => {
  const [mascota, setMascota] = useState<CreateMascotasDto>({
    rutUsuario: "",
    nombre: "",
    edad: 0,
    raza: "",
    imagen: "",
    afeccionesSalud: [],
    preferencias: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMascota({ ...mascota, [name]: value });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof CreateMascotasDto
  ) => {
    const { value } = e.target;
    const arrayValue = value.split(",").map((item) => item.trim());
    setMascota({ ...mascota, [key]: arrayValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(mascota);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rutUsuario">RUT Usuario</label>
        <input
          type="text"
          name="rutUsuario"
          id="rutUsuario"
          value={mascota.rutUsuario}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="nombre">Nombre Mascota</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={mascota.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="edad">Edad</label>
        <input
          type="number"
          name="edad"
          id="edad"
          value={mascota.edad}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="raza">Raza</label>
        <input
          type="text"
          name="raza"
          id="raza"
          value={mascota.raza}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="imagen">Imagen</label>
        <input
          type="text"
          name="imagen"
          id="imagen"
          value={mascota.imagen}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="afeccionesSalud">Afecciones de Salud</label>
        <textarea
          name="afeccionesSalud"
          id="afeccionesSalud"
          value={mascota.afeccionesSalud?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "afeccionesSalud")}
        />
        <small>Separar con comas</small>
      </div>

      <div>
        <label htmlFor="preferencias">Preferencias</label>
        <textarea
          name="preferencias"
          id="preferencias"
          value={mascota.preferencias?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "preferencias")}
        />
        <small>Separar con comas</small>
      </div>

      <button type="submit">Registrar Mascota</button>
    </form>
  );
};

export default FormularioRegistroMascota;
