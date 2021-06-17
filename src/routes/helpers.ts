import { protectedRoutes, authRoutes } from './definition';

const generateRouteUrl = (name: string, parameters: Record<string, string> = {}): string => {
  const route = [...protectedRoutes, ...authRoutes].find((r) => r.name === name);

  if (!route) {
    throw new Error(`Cannot build URL for unknown route ${name}.`);
  }

  return Object.keys(parameters).reduce(
    (url: string, parameterName: string) =>
      url.replace(new RegExp(`:${parameterName}`, 'gi'), parameters[parameterName]),
    route.path
  );
};

export default generateRouteUrl;
