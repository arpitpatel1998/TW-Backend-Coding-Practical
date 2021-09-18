import express from 'express';
import { connectToDatabase } from './helpers/connectToDatabase.helper.js';
import rideRouter from './routes/index.js';
import bodyParser from 'body-parser';

export const app = express();

export async function startServer() {
  const PORT = process.env.PORT;
  await connectToDatabase();
  app.use(bodyParser.json());
  app.use('/ride', rideRouter);
  app.get('/health', (req, res) => {
    console.log('GET /health');
    // TASK-001 Fix health route. The above console is printing but the response is not sent to client.
    return res.status(200).send();
  });
  app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    return Promise.resolve();
  });
}
