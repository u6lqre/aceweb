export const rewriteEngineUrl = (url: string) => {
  const httpUrl: string = import.meta.env.VITE_HTTP_ENGINE_URL;
  const engineUrl: string = import.meta.env.VITE_ENGINE_URL;

  const secureUrl = url.replace(httpUrl, engineUrl);

  return secureUrl;
};
