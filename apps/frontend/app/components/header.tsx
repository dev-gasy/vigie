import { Link, useLocation } from 'react-router'
import { cn } from '~/lib/utils'

export function Header() {
  const location = useLocation()

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
          <Link
            to="/issues"
            className={cn(
              'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
              location.pathname.startsWith('/issues')
                ? 'text-foreground bg-muted'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            Issues
          </Link>
          <Link
            to="/posts"
            className={cn(
              'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
              location.pathname.startsWith('/posts')
                ? 'text-foreground bg-muted'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            Posts
          </Link>
        </nav>
      </div>
    </header>
  )
}
