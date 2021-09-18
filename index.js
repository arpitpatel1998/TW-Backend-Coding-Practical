import dotenv from 'dotenv';
import {startServer} from './src/app.js';
import {cronConfig} from './src/cron/index.js';

(async () => {
  dotenv.config();
  cronConfig();
  await startServer();
})();
