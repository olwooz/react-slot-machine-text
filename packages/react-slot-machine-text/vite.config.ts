import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lib/index.ts'),
            name: 'SlotMachine',
            formats: ['es', 'umd'],
            fileName: (format) => `react-slot-machine-text.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'framer-motion'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'framer-motion': 'FramerMotion',
                },
            },
        },
    },
});