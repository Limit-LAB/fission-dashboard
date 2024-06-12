import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Jaeger Tracing" },
    { name: "description", content: "Jaeger Tracing" },
  ];
};

export default function Index() {
  return (
    <iframe
      className="w-full h-[calc(100vh-6rem)]"
      src={import.meta.env.VITE_PUBLIC_JAEGER_API_HOST}
    ></iframe>
  );
}
