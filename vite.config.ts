import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',  // Dirección de tu backend
        changeOrigin: true,               // Cambia el origen de la solicitud
        secure: false,                    // Deshabilita SSL si no estás usando HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Reescribe el prefijo de la URL
      },
    },
  },
});
