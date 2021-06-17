export interface RouteDefinition {
  name: string;
  path: string;
  exact: boolean;
  view: string;
  private: boolean;
}

export interface VerifyViewRouteState {
  fromVerify?: boolean;
}

export interface LoginViewRouteState {
  isAuthRequired?: boolean;
}

export const protectedRoutes: RouteDefinition[] = [
  {
    name: 'home',
    path: '/',
    exact: true,
    view: 'HomeView',
    private: true
  }
];

export const authRoutes: RouteDefinition[] = [
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
