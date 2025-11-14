import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  to: string
  label?: string
}

export function BackButton({ to, label = 'Back' }: BackButtonProps) {
  return (
    <div className="mb-8">
      <Link
        to={to}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        {label}
      </Link>
    </div>
  )
}
