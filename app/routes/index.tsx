import * as fs from "node:fs"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getHeaders } from "@tanstack/react-start/server"
import { z } from "zod"
import { loggingMiddleware } from "~/loggingMiddleware"

const filePath = "count.txt"

const UpdateCountInput = z.object({
  count: z.number(),
  time: z.number(),
})

// Helper for backend behavior. How would you use this in the Home component below?
async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, "utf-8").catch(() => "0"),
  )
}

// Attempted static server function... seems half-baked on TanStack's part
//
//
// const getBuildTimeStaticServerFn = createServerFn({ type: 'static' }).handler(async () => {
//   return new Date().toLocaleString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: false,
//     timeZoneName: 'short',
//   });
// });

// Endpoint on server
const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  console.log(getHeaders())
  return readCount()
})

// Endpoint on server
const updateCount = createServerFn({ method: "POST" })
  .validator((countInput: unknown) => {
    const parsed = UpdateCountInput.safeParse(countInput)
    if (!parsed.success) {
      // Probably an antipattern... These server functions should operate in lockstep with
      // your frontend. Your frontend should be the only one calling them (... it seems) and
      // if you're calling them incorrectly it really is signaling an application-wide 500.
      //
      // Probably better to adhere to the generic 500 error + response.
      // https://tanstack.com/start/latest/docs/framework/react/server-functions#throwing-errors
      //
      // setResponseStatus(400);
      // throw {
      //   status: 400,
      //   message: 'Invalid input',
      //   details: parsed.error.flatten(),
      // };

      throw new Error("invalid input.")
    }
    return parsed.data
  })
  .middleware([loggingMiddleware])
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data.count}`)
  })

// Route that serves html for "Home" component.
export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
})

// React component for this page. Notice this isn't exported.
function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  return (
    <>
      <button
        type="button"
        onClick={() => {
          updateCount({ data: { count: 1, time: Date.now() } }).then(() => {
            // The .invalidate method in the context of a router is used to invalidate route matches
            // by forcing their beforeLoad and load functions to be called again. This is particularly
            // useful when your loader data might be outdated or stale. For example, if you have a
            // route that displays a list of posts and a loader function that fetches this list from an API,
            // you might want to invalidate the route matches whenever a new post is created to ensure the
            // list is always up-to-date.
            //
            router.invalidate()
          })
        }}
      >
        Add 1 to {state}?
      </button>
    </>
  )
}
