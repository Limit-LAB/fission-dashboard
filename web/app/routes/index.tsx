// import type { MetaFunction } from "@remix-run/node";
// import { Link } from "@remix-run/react";

// wired issue: https://github.com/remix-run/remix/issues/9069
// so I need to specify the the meta in body
// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix SPA" },
//     { name: "description", content: "Welcome to Remix (SPA Mode)!" },
//   ];
// };

export default function Index() {
  return (
    <>
      <title>Fission Dashboard</title>
      <meta name="description" content="Welcome to Remix (SPA Mode)!" />
      <iframe
        className="w-full h-[calc(100vh-4rem)]"
        src={import.meta.env.VITE_PUBLIC_GRAFANA_API_HOST}
      ></iframe>
    </>
  );
}
