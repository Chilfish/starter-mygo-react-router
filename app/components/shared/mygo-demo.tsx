import type { FormEvent } from 'react'
import type { SystemInfo } from '~/mygo'
import { isMyGo } from 'mygo-runtime'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { useHydrated } from '~/hooks/use-hydrated'
import { events, Greeter, System } from '~/mygo'

function formatTime(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleTimeString()
}

export function MyGoDemo() {
  const hydrated = useHydrated()
  const desktop = hydrated && isMyGo()
  const [info, setInfo] = useState<SystemInfo | null>(null)
  const [clock, setClock] = useState('—')
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!desktop)
      return

    let alive = true
    System.info()
      .then((value) => {
        if (alive)
          setInfo(value)
      })
      .catch((cause: unknown) => {
        if (alive) {
          setError(cause instanceof Error
            ? cause.message
            : String(cause))
        }
      })

    const stop = events.tick.on(value => setClock(formatTime(value)))
    return () => {
      alive = false
      stop()
    }
  }, [desktop])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      setGreeting(await Greeter.greet(name))
    }
    catch (cause) {
      setError(cause instanceof Error
        ? cause.message
        : String(cause))
    }
    finally {
      setPending(false)
    }
  }

  return (
    <Card className="w-full max-w-xl text-left">
      <CardHeader>
        <CardTitle>MyGo runtime</CardTitle>
        <CardDescription>
          {!hydrated
            ? 'Detecting the runtime…'
            : desktop
              ? `Greeting from Go, updated every second. Current time: ${clock}`
              : 'Browser preview: Go bindings are only available in mygo dev or a packaged app.'}
        </CardDescription>
      </CardHeader>

      {desktop && (
        <CardPanel className="space-y-4">
          {info && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">App</dt>
              <dd>
                {info.name}
                {' '}
                {info.version}
              </dd>
              <dt className="text-muted-foreground">Platform</dt>
              <dd>
                {info.os}
                /
                {info.arch}
              </dd>
              <dt className="text-muted-foreground">Go</dt>
              <dd>{info.goVersion}</dd>
              <dt className="text-muted-foreground">User data</dt>
              <dd className="break-all">{info.userData || '—'}</dd>
            </dl>
          )}

          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              aria-label="Your name"
              placeholder="Your name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <Button type="submit" loading={pending}>
              Greet
            </Button>
          </form>

          {greeting && <p className="text-sm">{greeting}</p>}
          {error && <p className="text-destructive text-sm">{error}</p>}
        </CardPanel>
      )}
    </Card>
  )
}
