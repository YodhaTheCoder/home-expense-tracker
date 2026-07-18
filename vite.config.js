import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "icon-192.png",
        "icon-512.png"
      ],
      manifest: {
        name: "Home Expense Tracker",
        short_name: "Expenses",
        description: "Track your home expenses easily.",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/home-expense-tracker/",
        scope: "/home-expense-tracker/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })],
  base: "/home-expense-tracker/",
});
