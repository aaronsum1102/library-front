export interface RuntimeConfig {
  app: {
    baseUrl: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    appId: string;
  };
}

const getRuntimeConfig = (): RuntimeConfig => {
  const projectId = <string>process.env.PROJECT_ID;
  return {
    app: {
      baseUrl: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/`
        : 'http://localhost:3000/'
    },
    firebase: {
      apiKey: <string>process.env.API_KEY,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId,
      appId: <string>process.env.APP_ID
    }
  };
};

export default getRuntimeConfig;
