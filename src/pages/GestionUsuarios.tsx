// import { useState } from "react";
// import { MainLayout } from "../layout/MainLayout";
// import { useDispatch } from "react-redux";
// import { UsuarioDto, UserRole } from "../interface/Usuarios/dto/UsuarioDto";

// export const GestionUsuarios = () => {
//   const dispatch = useDispatch();

//   const [form, setForm] = useState<UsuarioDto>({
//     rutUsuario: "",
//     contrasena: "",
//     nombre: "",
//     apePaterno: "",
//     apeMaterno: "",
//     correoElectronico: "",
//     telefono: "",
//     rolUsuario: "USER" as UserRole,
//   });

//   const [searchRut, setSearchRut] = useState<string>("");
//   const [searchResult, setSearchResult] = useState<UsuarioDto | null>(null);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchRut(event.target.value);
//   };

//   const addUserToAPI = async (user: UsuarioDto) => {
//     const response = await fetch("/api/usuarios", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });

//     if (!response.ok) {
//       throw new Error("No se pudo agregar el usuario");
//     }

//     return response.json();
//   };

//   const fetchUserFromAPI = async (rutUsuario: string) => {
//     const response = await fetch(`/api/usuarios/${rutUsuario}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("No se pudo obtener el usuario");
//     }

//     return response.json();
//   };

//   const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();

//     if (form.nombre === "") {
//       alert("El campo nombre es obligatorio");
//       return;
//     }
//     if (form.rutUsuario === "") {
//       alert("El campo RUT Usuario es obligatorio");
//       return;
//     }
//     if (form.contrasena === "") {
//       alert("El campo contraseña es obligatorio");
//       return;
//     }
//     if (form.apePaterno === "") {
//       alert("El campo apellido paterno es obligatorio");
//       return;
//     }
//     if (form.apeMaterno === "") {
//       alert("El campo apellido materno es obligatorio");
//       return;
//     }
//     if (form.correoElectronico === "") {
//       alert("El campo correo electrónico es obligatorio");
//       return;
//     }
//     if (form.telefono === "") {
//       alert("El campo teléfono es obligatorio");
//       return;
//     }
//     if (!form.rolUsuario) {
//       alert("El campo rol usuario es obligatorio");
//       return;
//     }

//     try {
//       const newUser = await addUserToAPI(form);
//       dispatch(addUser(newUser));
//       setForm({
//         rutUsuario: "",
//         contrasena: "",
//         nombre: "",
//         apePaterno: "",
//         apeMaterno: "",
//         correoElectronico: "",
//         telefono: "",
//         rolUsuario: "USER" as UserRole,
//       });
//     } catch (error) {
//       console.error("Error al agregar el usuario:", error);
//       alert("Error al agregar el usuario");
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const user = await fetchUserFromAPI(searchRut);
//       setSearchResult(user);
//     } catch (error) {
//       console.error("Error al buscar el usuario:", error);
//       alert("Error al buscar el usuario");
//     }
//   };

//   return (
//     <MainLayout>
//       <h1>Gestión de Usuarios</h1>
//       <form>
//         <div>
//           <label>RUT Usuario</label>
//           <input name="rutUsuario" value={form.rutUsuario} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Contraseña</label>
//           <input
//             type="password"
//             name="contrasena"
//             value={form.contrasena}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Nombre</label>
//           <input
//             name="nombre"
//             value={form.nombre}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Apellido Paterno</label>
//           <input
//             name="apePaterno"
//             value={form.apePaterno}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Apellido Materno</label>
//           <input
//             name="apeMaterno"
//             value={form.apeMaterno}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Correo Electrónico</label>
//           <input
//             type="email"
//             name="correoElectronico"
//             value={form.correoElectronico}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Teléfono</label>
//           <input
//             name="telefono"
//             value={form.telefono}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Rol Usuario</label>
//           <input
//             name="rolUsuario"
//             value={form.rolUsuario}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="button" onClick={handleSubmit}>
//           Enviar
//         </button>
//       </form>
//       <div>
//         <h2>Buscar Usuario</h2>
//         <input
//           type="text"
//           placeholder="Ingrese RUT del usuario"
//           value={searchRut}
//           onChange={handleSearchChange}
//         />
//         <button onClick={handleSearch}>Buscar</button>
//         {searchResult && (
//           <div>
//             <h3>Resultado de la búsqueda:</h3>
//             <p>Nombre: {searchResult.nombre}</p>
//             <p>RUT: {searchResult.rutUsuario}</p>
//             <p>Email: {searchResult.correoElectronico}</p>
//             <p>Teléfono: {searchResult.telefono}</p>
//             <p>Rol: {searchResult.rolUsuario}</p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default GestionUsuarios;
