/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SERVER_API_HOST: string;
  readonly VITE_PUBLIC_GRAFANA_API_HOST: string;
  readonly VITE_PUBLIC_JAEGER_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
