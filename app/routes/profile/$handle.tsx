import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$handle')({
  component: ProfileComponent,
})

function ProfileComponent() {
  const { handle } = Route.useParams()
  return <div>`Hello ${handle}!`</div>
}
