import { OpenAPI, AppClient as ServerAppClient } from "@/api/server"

function createApiClient<
  T extends {
    new (...args: any[]): any
  },
>(client: T, base: string): () => InstanceType<T> {
  return () => {
    return new client(
      Object.assign({}, OpenAPI, {
        BASE: base,
        // TOKEN: token,
      }),
      // HttpRequest as any,
    )
  }
}

export const useApiClient = createApiClient(
  ServerAppClient,
  import.meta.env.VITE_PUBLIC_SERVER_API_HOST!
);
