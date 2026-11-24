import type { Route } from './+types/not-found'
import { ErrorDisplay } from '~/components/shared/error-boundary'
import { generateSEOMeta } from '~/lib/seo'

export const meta: Route.MetaFunction = () =>
  generateSEOMeta({ title: 'Page not found', noIndex: true })

export default function NotFound() {
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  return (
    <ErrorDisplay
      message="Page not found"
      detail="The page you requested does not exist or has been removed."
    />
  )
}
