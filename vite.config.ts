import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setupTests.ts',
        css: true,
        typecheck: {
            enabled: true,
        },
        exclude: [...configDefaults.exclude],
        coverage: {
            provider: 'v8',
            reportsDirectory: './coverage',
            reporter: ['text', 'html'],
            include: [
                'src/redux/slices/cartSlice.ts',
                'src/components/button/CartButton.tsx',
                'src/pages/OrderPage.tsx',
            ],
            exclude: [
                'src/main.tsx',
                'src/App.tsx',
                'src/firebase.ts',
                'src/i18n/**',
                'src/contexts/**',
                'src/router/**',
            ],
        },
    },
});
