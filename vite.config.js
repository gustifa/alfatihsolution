import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- 1. Tambahkan import ini

export default defineConfig({
    plugins: [
        laravel({
            // <-- 2. Pastikan resources/css/app.css ada di dalam array input
            input: ['resources/css/app.css', 'resources/js/app.jsx'], 
            refresh: true,
            optimizeFallbacks: false,
        }),
        react(),
        tailwindcss(), // <-- 3. Panggil plugin Tailwind di sini
    ],
});