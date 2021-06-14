import { protectedRoutes, authRoutes } from './definition';

export interface RouteDefinition {
  name: string;
  path: string;
  exact: boolean;
  view: string;
  private: boolean;
}

export const generateRouteUrl = (name: string, parameters: Record<string, string> = {}): string => {
  const route = [...protectedRoutes, ...authRoutes].find((route) => route.name == name);

  if (!route) {
    throw new Error(`Cannot build URL for unknown route ${name}.`);
  }

  return Object.keys(parameters).reduce(
    (url: string, parameterName: string) =>
      url.replace(new RegExp(`:${parameterName}`, 'gi'), parameters[parameterName]),
    route.path
  );
};
