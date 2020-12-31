import GhostContentAPI from '@tryghost/content-api';

const ghost = new GhostContentAPI({
  url:  'https://devingray.io',
  key: '07a56a659476f0a22f7c3b3ed4',
  version: 'v3'
});

export default ghost;
