import express from 'express';
import { env } from './config/env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
});

export default app;
