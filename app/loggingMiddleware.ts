import { createMiddleware } from '@tanstack/react-start'

// Potential middleware responsibbilities:
//
// Authentication: Verify a user's identity before executing a server function.
// Authorization: Check if a user has the necessary permissions to execute a server function.
// Logging: Log requests, responses, and errors.
// Observability: Collect metrics, traces, and logs.
// Provide Context: Attach data to the request object for use in other middleware or server functions.
// Error Handling: Handle errors in a consistent way.

export const loggingMiddleware = createMiddleware().server(async ({ next, data }) => {
  console.log('Request received:', data)
  const result = await next()
  console.log('Response processed:', result)
  return result
})
