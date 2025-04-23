import { Link } from '@tanstack/react-router'
import { CircleUser, Cog, House } from 'lucide-react'
import Logo from '~/assets/logo.svg'

export function Navigation() {
  return (
    <nav role="navigation" className="p-4">
      <h1 className="mb-2 font-serif">
        <img src={Logo} alt={'gus social'} className="w-24" />
      </h1>
      <NavigationLink route="/" icon={<House />} text="Home" />
      <NavigationLink
        route="/profile/wow"
        icon={<CircleUser />}
        text="Profile"
      />
      <NavigationLink route="/settings" icon={<Cog />} text="Settings" />
    </nav>
  )
}

interface NavigationLinkProps {
  route: string
  text: string
  icon: React.ReactNode
}

function NavigationLink({ route, text, icon }: NavigationLinkProps) {
  return (
    <Link to={route} className="flex gap-2 rounded-sm p-2 hover:bg-gray-100">
      {icon}
      {text}
    </Link>
  )
}
