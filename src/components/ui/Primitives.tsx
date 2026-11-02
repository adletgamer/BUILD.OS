import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export function ButtonLink({ className = '', ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`button-link ${className}`} {...props} />
}

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`badge ${className}`}>{children}</span>
}

export function SurfaceCard({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={`surface-card ${className}`} {...props} />
}
