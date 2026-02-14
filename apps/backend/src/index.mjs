import { createServer } from './api/server.mjs';

const port = Number(process.env.PORT || 8080);
const host = process.env.API_HOST || '0.0.0.0';

const server = createServer();

const shutdown = (signal) => {
  // eslint-disable-next-line no-console
  console.log(`[shutdown] received ${signal}, closing HTTP server...`);
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('[shutdown] HTTP server closed');
    process.exit(0);
  });

  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.error('[shutdown] force exit after timeout');
    process.exit(1);
  }, 10000).unref();
};

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, host, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://${host}:${port}`);
  });

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}
