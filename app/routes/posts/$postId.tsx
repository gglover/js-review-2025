import { createFileRoute } from "@tanstack/react-router"

// Route that serves html for "Home" component.
export const Route = createFileRoute("/posts/$postId")({
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()

  return <h1>Post ID: {postId}</h1>
}
