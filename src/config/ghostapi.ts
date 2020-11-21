import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: process.env.GHOST_BASE_URL || 'http://localhost:8080',
  key: process.env.GHOST_API_KEY || '',
  version: 'v3'
});

export default api;
