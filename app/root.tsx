import { ClerkApp, ClerkErrorBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as ToastManager } from "react-hot-toast";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider as RemixThemesProvider,
  useTheme,
} from "remix-themes";
import { BreakpointIndicator } from "./components/breakpoint-indicator";
import { tw } from "./helpers/utils";
import { themeSessionResolver } from "./sessions.server";
import styles from "./styles/globals.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  // { rel: "preconnect", href: "https://fonts.googleapis.com" },
  // {
  //   rel: "preconnect",
  //   href: "https://fonts.gstatic.com",
  //   crossOrigin: "use-credentials",
  // },
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap",
  // },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = (args: LoaderFunctionArgs) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { getTheme } = await themeSessionResolver(request);

    return { theme: getTheme() };
  });
};

export const ErrorBoundary = ClerkErrorBoundary();

function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html
      lang="en"
      dir="ltr"
      data-darkreader-mode="dynamic"
      data-darkreader-theme={theme ?? ""}
      className={tw`__sans__`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '@font-face{font-family:__FontSans_Fallback;src:system-ui;size-adjust:100%;}@font-face{font-family:"__FontSans";src:url("/fonts/spartan-medium-webfont.woff2")format("woff2"),url("/fonts/spartan-medium-webfont.woff")format("woff");font-weight:500;font-style:normal;font-display:swap;}@font-face{font-family:"__FontSans";src:url("/fonts/spartan-bold-webfont.woff2")format("woff2"),url("/fonts/spartan-bold-webfont.woff")format("woff");font-weight:700;font-style:normal;font-display:swap;}.__sans__{--font-sans:"__FontSans","__FontSans_Fallback";}',
          }}
        />
      </head>

      <body className="relative min-h-screen antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />

        <ToastManager />
        <BreakpointIndicator />
      </body>
    </html>
  );
}

function Root() {
  const data = useLoaderData<typeof loader>();
  return (
    <RemixThemesProvider
      specifiedTheme={data.theme}
      themeAction="/action/set-theme"
    >
      <App />
    </RemixThemesProvider>
  );
}

export default ClerkApp(Root);
