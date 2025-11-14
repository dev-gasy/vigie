import { Link } from 'react-router'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-6 flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              Vigie
            </span>
          </Link>
        </div>
        <nav className="flex items-center space-x-1">
          <NavLink to="/issues">Issues</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </div>
    </header>
  )
}
