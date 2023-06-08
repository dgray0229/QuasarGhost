import GhostContentAPI from '@tryghost/content-api';

declare const process: {
  env: {
    GHOST_API_URL: string;
    GHOST_CONTENT_API_KEY: string;
  };
};

const ghost = new GhostContentAPI({
  url:  String(process.env.GHOST_API_URL),
  key: String(process.env.GHOST_CONTENT_API_KEY),
  version: 'v3',
});

export default ghost;
