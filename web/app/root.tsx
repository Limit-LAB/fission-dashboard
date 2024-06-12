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
import { AppShell, Burger, Group, MantineProvider, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const contexts = [
  <QueryClientProvider client={new QueryClient()} />,
  <MantineProvider />,
];

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
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        navbar: {
          zIndex: 0,
        },
        header: {
          zIndex: 0,
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={4}>
            Fission Dashboard
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navigation
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
          ]}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
