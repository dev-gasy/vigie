import { Link, useLocation } from 'react-router'
import { cn } from '~/lib/utils'
import type { ReactNode } from 'react'

interface NavLinkProps {
  to: string
  children: ReactNode
  className?: string
}

export function NavLink({ to, children, className }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to)
  return (
    <Link
      to={to}
      className={cn(
        'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
        isActive
          ? 'text-foreground bg-muted'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
        className
      )}
    >
      {children}
    </Link>
  )
}
