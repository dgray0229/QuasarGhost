import GhostContentAPI from '@tryghost/content-api';
const ghost = new GhostContentAPI({
  url:  'http://blogapi.devingray.io',
  key: '845fa738b73938460645e6639e',
  version: 'v5.0'
});

export default ghost;
