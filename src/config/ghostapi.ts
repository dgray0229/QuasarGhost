import GhostContentAPI, { GhostContentAPIOptions } from '@tryghost/content-api';
const ghost = new GhostContentAPI({
  url:  String(process.env.GHOST_BASE_URL),
  key: String(process.env.GHOST_API_KEY),
  version: String(process.env.GHOST_API_VERSION) as GhostContentAPIOptions['version']
});

export default ghost;
