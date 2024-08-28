import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Homepage from '../pages/HomePage'
import FormularioRegistroUsuario from '../components/FormularioRegistroUsuario'
import FormularioRegistroMascota from '../components/FormularioRegistroMascota'
import FormularioRegistroProducto from '../components/FormularioRegistroProducto';
import  '../index.css';
export default function MainLayout() {
  return (
    <>
       <Header />
       <Nav />
       <Homepage />
       <FormularioRegistroUsuario />
       <FormularioRegistroMascota />
       <FormularioRegistroProducto />
       
    </>
  )
}
