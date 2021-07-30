export interface RouteDefinition {
  name: string;
  path: string;
  exact: boolean;
  view: string;
  private: boolean;
  label?: string;
  restricted?: boolean;
}

export interface NotifyViewRouteState {
  fromVerify?: boolean;
}

export const routes: RouteDefinition[] = [
  {
    name: 'admin',
    path: '/admin',
    exact: true,
    view: 'AdminView',
    private: true,
    label: 'Admin',
    restricted: true
  },
  {
    name: 'home',
    path: '/',
    exact: true,
    view: 'HomeView',
    private: true,
    label: 'Resources'
  },
  {
    name: 'login',
    path: '/login',
    exact: true,
    view: 'LoginView',
    private: false
  },
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
