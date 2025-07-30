import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
import UniPages from '@uni-helper/vite-plugin-uni-pages';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const { VITE_APP_ID } = env;
  if (VITE_APP_ID) {
    const manifestPath = path.resolve(__dirname, './src/manifest.json');
    const manifest = require(manifestPath);
    manifest['mp-weixin'].appid = VITE_APP_ID;
    require('fs').writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  }

  return {
    plugins: [UniPages(), UniLayouts(), uni()],
    esbuild: {
      drop: env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, '.', 'src/components'),
        utils: path.resolve(__dirname, '.', 'src/utils'),
        api: path.resolve(__dirname, '.', 'src/api'),
        static: path.resolve(__dirname, '.', 'src/static'),
        contexts: path.resolve(__dirname, '.', 'src/contexts'),
        types: path.resolve(__dirname, '.', 'src/types'),
        constant: path.resolve(__dirname, '.', 'src/constant'),
        hooks: path.resolve(__dirname, '.', 'src/hooks'),
        stores: path.resolve(__dirname, '.', 'src/stores'),
      },
    },
  };
});
