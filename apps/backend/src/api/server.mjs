import http from 'node:http';
import { Roles } from '../auth/roles.mjs';

const health = () => ({ status: 'ok', service: 'hybrid-b2b-platform-api' });

export const createServer = () =>
  http.createServer((req, res) => {
    if (req.url === '/health' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(health()));
      return;
    }

    if (req.url === '/roles' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ roles: Object.values(Roles) }));
      return;
    }

    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  });
