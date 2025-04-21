import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

// Best documentation on setup for file-based routing tree:
// https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing
// https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
