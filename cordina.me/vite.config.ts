import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process';
import { copyFileSync, existsSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

import packageJson from './package.json' assert { type: 'json' };

if (!existsSync('.env')) {
  copyFileSync('.env.defaults', '.env');
}

let gitHash;
try {
  gitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (error) {
  gitHash = 'unknown'; // Default value when not in a git repository
}

process.env.MEDPLUM_VERSION = packageJson.version + '-' + gitHash;

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ['MEDPLUM_', 'GOOGLE_', 'RECAPTCHA_'],
  server: {
    port: 3000,
  },
  publicDir: 'public',
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@medplum/core': path.resolve(__dirname, '../packages/core/src'),
      '@medplum/react': path.resolve(__dirname, '../packages/react/src'),
    }
  },
})
