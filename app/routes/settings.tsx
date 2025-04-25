import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: SettingsRouteComponent,
})

function SettingsRouteComponent() {
  return <div>Hello "/settings"!</div>
}
