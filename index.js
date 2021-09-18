import dotenv from 'dotenv';
import {startServer} from './src/app.js';

(async () => {
  dotenv.config();
  await startServer();
})();
