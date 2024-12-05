'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, ReactNode, useContext, useOptimistic, useTransition } from 'react'
import { z } from 'zod'

const filterSchema = z.object({
  with_genres: z.array(z.string()).default([]).optional(),
  query: z.string().default('').optional(),
})

type Filters = z.infer<typeof filterSchema>
type FilterContextType = {
  filters: Filters
  isPending: boolean
  updateFilters: (_updates: Partial<Filters>) => void
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined)

export default function FilterProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filters = filterSchema.safeParse({
    with_genres: searchParams.getAll('with_genres'),
    query: searchParams.get('query') ?? undefined,
  })

  const [isPending, startTransition] = useTransition()
  const [optimisticFilters, setOptimisticFilters] = useOptimistic(
    filters.data,
    (prevState, newFilters: Partial<Filters>) => {
      return { ...prevState, ...newFilters }
    }
  )

  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    const newState = {
      ...optimisticFilters,
      ...updates,
    }
    const newSearchParams = new URLSearchParams()

    Object.entries(newState).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => newSearchParams.append(key, val))
      } else if (value !== undefined) {
        newSearchParams.append(key, value)
      }
    })

    startTransition(() => {
      setOptimisticFilters(updates ?? {})
      router.push(`?${newSearchParams}`)
    })
  }

  return (
    <FilterContext.Provider value={{ filters: optimisticFilters || {}, isPending, updateFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
