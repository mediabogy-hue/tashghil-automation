import { createServer } from './api/server.mjs';

const port = Number(process.env.PORT || 8080);

if (process.env.NODE_ENV !== 'test') {
  createServer().listen(port, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://0.0.0.0:${port}`);
  });
}
