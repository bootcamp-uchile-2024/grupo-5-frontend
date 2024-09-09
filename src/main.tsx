import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/login" element={<div>LoginPage</div>} />
      </Routes>
      <App />
    </BrowserRouter>
  </StrictMode>
)
