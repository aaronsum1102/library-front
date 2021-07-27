export interface RouteDefinition {
  name: string;
  path: string;
  exact: boolean;
  view: string;
  private: boolean;
  label: string;
}

export interface VerifyViewRouteState {
  fromVerify?: boolean;
}

export const protectedRoutes: RouteDefinition[] = [
  {
    name: 'home',
    path: '/',
    exact: true,
    view: 'HomeView',
    private: true,
    label: 'Resources'
  }
];

export const authRoutes: Omit<RouteDefinition, 'label'>[] = [
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
