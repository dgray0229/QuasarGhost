import GhostContentAPI from '@tryghost/content-api';
import dotenv from 'dotenv';

dotenv.config();
const ghost = new GhostContentAPI({
  url:  String(process.env.GHOST_URL),
  key: String(process.env.GHOST_KEY),
  version: 'v3',
});

export default ghost;
