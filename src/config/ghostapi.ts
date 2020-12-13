import GhostContentAPI from '@tryghost/content-api';

const ghost = new GhostContentAPI({
  url: process.env.GHOST_BASE_URL || 'https://devingray.io',
  key: process.env.GHOST_API_KEY || '07a56a659476f0a22f7c3b3ed4',
  version: 'v3'
});

export default ghost;
