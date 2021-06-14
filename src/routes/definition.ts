import { RouteDefinition } from './helpers';

export const routes: RouteDefinition[] = [
  {
    name: 'login',
    path: '/login',
    exact: true,
    view: 'LoginView',
    private: false
  },
  {
    name: 'home',
    path: '/',
    exact: true,
    view: 'HomeView',
    private: true
  }
];

export const verificationRoutes: RouteDefinition[] = [
  {
    name: 'verify',
    path: '/verify',
    exact: true,
    view: 'VerifyView',
    private: false
  },
  {
    name: 'notify',
    path: '/notify',
    exact: true,
    view: 'NotifyView',
    private: false
  }
];
