import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/expense-tracker/",
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/login': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
      '/users': 'http://localhost:8000',
      '/expenses': 'http://localhost:8000',
      '/categories': 'http://localhost:8000',
      '/summary': 'http://localhost:8000',
    },
  },
});
