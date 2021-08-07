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
    label: 'Admin - User management',
    restricted: true
  },
  {
    name: 'home',
    path: '/',
    exact: true,
    view: 'HomeView',
    private: true,
    label: 'Catalogue'
  },
  {
    name: 'loans',
    path: '/loans',
    exact: true,
    view: 'LoansView',
    private: true,
    label: 'Loans'
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
