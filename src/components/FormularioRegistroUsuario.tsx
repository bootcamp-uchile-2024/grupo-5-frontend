import React, { useState } from 'react';
import { CreateUsuarioDto } from 'src/interface/CreateUsuarioDTO.ts';


function FormularioRegistroUsuario() {
    const [usuario, setUsuario] = useState<CreateUsuarioDto>({
        rutUsuario: '',
        contrasena: '',
        nombre: '',
        apePaterno: '',
        apeMaterno: '',
        correoElectronico: '',
        telefono: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(usuario);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="rutUsuario">RUT Usuario</label>
                <input
                    type="text"
                    name="rutUsuario"
                    id="rutUsuario"
                    value={usuario.rutUsuario}
                    onChange={handleChange}
                    required />
            </div>

            <div>
                <label htmlFor="contrasena">Contraseña</label>
                <input
                    type="password"
                    name="contrasena"
                    id="contrasena"
                    value={usuario.contrasena}
                    onChange={handleChange}
                    required />
            </div>

            <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                    required />
            </div>

            <div>
                <label htmlFor="apePaterno">Apellido Paterno</label>
                <input
                    type="text"
                    name="apePaterno"
                    id="apePaterno"
                    value={usuario.apePaterno}
                    onChange={handleChange}
                    required />
            </div>

            <div>
                <label htmlFor="apeMaterno">Apellido Materno</label>
                <input
                    type="text"
                    name="apeMaterno"
                    id="apeMaterno"
                    value={usuario.apeMaterno}
                    onChange={handleChange}
                    required />
            </div>

            <div>
                <label htmlFor="correoElectronico">Correo Electrónico</label>
                <input
                    type="email"
                    name="correoElectronico"
                    id="correoElectronico"
                    value={usuario.correoElectronico}
                    onChange={handleChange}
                    required />
            </div>

            <div>
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={usuario.telefono}
                    onChange={handleChange}
                    required />
            </div>

            <button type="submit">Registrar Usuario</button>
        </form>
    );
}

export default FormularioRegistroUsuario;
