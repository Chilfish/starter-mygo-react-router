import type { Route } from './+types/home'
import { MyGoDemo } from '~/components/shared/mygo-demo'
import { SearchDemo } from '~/components/shared/search-demo'
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

import { generateSEOMeta } from '~/lib/seo'

export function meta(): Route.MetaDescriptors {
  return generateSEOMeta({ title: 'Home' })
}

export default function Home() {
  const items = [
    { description: 'npx create-next-app', label: 'Next.js', value: 'next' },
    { description: 'npm create vite@latest', label: 'Vite', value: 'vite' },
    { description: 'npm create astro@latest', label: 'Astro', value: 'astro' },
    { description: 'npx create-remix', label: 'Remix', value: 'remix' },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          React Router v8
        </h1>
        <p className="mt-2 text-muted-foreground">
          coss-ui · Tailwind CSS v4 · Base UI
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>

        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Destructive
          </AlertDialogTrigger>
          <AlertDialogPopup>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete account</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone. It permanently deletes your account and related data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogClose render={<Button variant="ghost" />}>
                Cancel
              </AlertDialogClose>
              <AlertDialogClose render={<Button variant="destructive" />}>
                Delete
              </AlertDialogClose>
            </AlertDialogFooter>
          </AlertDialogPopup>
        </AlertDialog>
      </div>

      <div>
        <Select
          aria-label="Select framework with command"
          defaultValue={items[0]}
          itemToStringValue={item => item.value}
        >
          <SelectTrigger className="py-1">
            <SelectValue>
              {item => (
                <span className="flex flex-col">
                  <span className="truncate">{item.label}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {item.description}
                  </span>
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectPopup>
            {items.map(item => (
              <SelectItem key={item.value} value={item}>
                <span className="flex flex-col">
                  <span className="truncate">{item.label}</span>
                  <span className="truncate text-muted-foreground text-xs">
                    {item.description}
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>

      <div className="mt-12 flex w-full max-w-xl flex-col gap-6">
        <MyGoDemo />
        <SearchDemo />
      </div>

      <footer className="mt-16 text-xs text-muted-foreground">
        Start editing
        {' '}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          app/routes/home.tsx
        </code>
      </footer>
    </div>
  )
}
