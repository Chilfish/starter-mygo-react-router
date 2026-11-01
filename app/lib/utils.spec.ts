import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('mergesClassNames_returnsSingleString', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('conflictingTailwindClasses_keepsLastOne', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('falsyValues_areIgnored', () => {
    expect(cn('px-2', undefined, false, null, 'text-sm')).toBe('px-2 text-sm')
  })
})
