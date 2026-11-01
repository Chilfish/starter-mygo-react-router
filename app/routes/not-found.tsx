import type { Route } from './+types/not-found'
import { ErrorDisplay } from '~/components/shared/error-boundary'
import { generateSEOMeta } from '~/lib/seo'

export const meta: Route.MetaFunction = () =>
  generateSEOMeta({ title: '页面未找到', noIndex: true })

export default function NotFound() {
  return <ErrorBoundary />
}

export function ErrorBoundary() {
  return (
    <ErrorDisplay
      message="页面未找到"
      detail="您要查找的页面似乎不存在，或者可能已被删除。"
    />
  )
}
