import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/posts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Posts.vue') },
      {
        path: ':slug',
        component: () => import('pages/Single.vue'),
        name: 'single'
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'tag/:slug',
        component: () => import('pages/Tags.vue'),
        name: 'List'
      },
      {
        path: 'author/:slug',
        component: () => import('pages/Author.vue'),
        name: 'SingleAuthor'
      },
      {
        path: ':slug',
        component: () => import('pages/Page.vue'),
        name: 'page'
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
