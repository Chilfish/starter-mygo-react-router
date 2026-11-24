import { isMyGo } from 'mygo-runtime'
import { useEffect, useRef, useState } from 'react'
import { Spinner } from '~/components/shared/spinner'
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { useHydrated } from '~/hooks/use-hydrated'
import { Searcher } from '~/mygo'

export function SearchDemo() {
  const hydrated = useHydrated()
  const desktop = hydrated && isMyGo()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  function search(value: string) {
    // Aborting the previous call cancels its context.Context in Go.
    controllerRef.current?.abort()
    setQuery(value)

    const trimmed = value.trim()
    if (!trimmed) {
      setResults([])
      setPending(false)
      setError('')
      return
    }

    const controller = new AbortController()
    controllerRef.current = controller
    setPending(true)
    setError('')

    Searcher.search.with({ signal: controller.signal })(trimmed)
      .then((matches) => {
        setResults(matches)
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted)
          return // a newer keystroke replaced this call
        setError(cause instanceof Error
          ? cause.message
          : String(cause))
      })
      .finally(() => {
        if (!controller.signal.aborted)
          setPending(false)
      })
  }

  return (
    <Card className="w-full max-w-xl text-left">
      <CardHeader>
        <CardTitle>Cancellable call</CardTitle>
        <CardDescription>
          {!hydrated
            ? 'Detecting the runtime…'
            : desktop
              ? 'Each keystroke cancels the previous Go call: the page passes an AbortSignal, and Go receives a canceled context.Context.'
              : 'Browser preview: this call is only available in mygo dev or a packaged app.'}
        </CardDescription>
      </CardHeader>

      {desktop && (
        <CardPanel className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              aria-label="Search MyGo topics"
              placeholder="Search MyGo topics, for example channel"
              type="search"
              value={query}
              onChange={event => search(event.target.value)}
            />
            {pending && <Spinner className="size-4 shrink-0 text-muted-foreground" />}
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          {!error && !pending && query.trim() && results.length === 0 && (
            <p className="text-muted-foreground text-sm">No matching topics.</p>
          )}

          {results.length > 0 && (
            <ul className="space-y-1 text-sm" aria-live="polite">
              {results.map(topic => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          )}
        </CardPanel>
      )}
    </Card>
  )
}
