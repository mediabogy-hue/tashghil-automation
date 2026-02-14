import http from 'node:http';
import { Roles } from '../auth/roles.mjs';

const appName = process.env.APP_NAME || 'hybrid-b2b-platform-api';

const health = () => ({
  status: 'ok',
  service: appName,
  nodeEnv: process.env.NODE_ENV || 'development',
  uptimeSec: Math.floor(process.uptime()),
  timestamp: new Date().toISOString(),
});

export const createServer = () =>
  http.createServer((req, res) => {
    if ((req.url === '/health' || req.url === '/live') && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(health()));
      return;
    }

    if (req.url === '/ready' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: 'ready' }));
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
