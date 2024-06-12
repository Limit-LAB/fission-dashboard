import { Navigation } from "@/components/layout/navigation";
import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComposeContextProvider } from "foxact/compose-context-provider";
import {
  // CircleHelpIcon,
  HomeIcon,
  PackageIcon,
  ContainerIcon,
  // SettingsIcon,
  SquareFunctionIcon,
  RouteIcon,
  GanttChart,
} from "lucide-react";
import stylesheet from "~/tailwind.css?url";
import { Toaster } from "@/components/ui/toaster";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const contexts = [<QueryClientProvider client={new QueryClient()} />];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ComposeContextProvider contexts={contexts}>
          {children}
          <Toaster />
          <ScrollRestoration />
          <Scripts />
        </ComposeContextProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex">
      <aside className="h-screen border-r border-zinc-200 basis-96">
        <h1 className="px-6 pt-10 fixed">Fission Dashboard</h1>
        <Navigation
          className="fixed top-20 w-72 pl-3"
          links={[
            {
              to: "/",
              icon: HomeIcon,
              label: "Dashboard",
            },
            {
              to: "/environments",
              icon: ContainerIcon,
              label: "Environments",
            },
            {
              to: "/packages",
              icon: PackageIcon,
              label: "Packages",
            },
            {
              to: "/functions",
              icon: SquareFunctionIcon,
              label: "Functions",
            },
            {
              to: "/triggers",
              icon: RouteIcon,
              label: "Triggers",
            },
            {
              to: "/jaeger",
              icon: GanttChart,
              label: "Jaeger",
            },
            // {
            //   to: "/settings",
            //   icon: SettingsIcon,
            //   label: "Settings",
            // },
            // {
            //   to: "/help",
            //   icon: CircleHelpIcon,
            //   label: "Help",
            // },
          ]}
        />
      </aside>
      <main className="w-full p-10">
        <Outlet />
      </main>
    </div>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
