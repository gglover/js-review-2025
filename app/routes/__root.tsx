import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ConvexReactClient } from 'convex/react'
import type { ReactNode } from 'react'
import { Navigation } from '~/components/navigation'

import appCss from '~/styles/global.css?url'

const deploymentURL = import.meta.env.VITE_CONVEX_URL
const convex = new ConvexReactClient(deploymentURL)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <main className="max-w-l mt-8 flex justify-center gap-4">
        <Navigation />
        <div className="w-sm">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
