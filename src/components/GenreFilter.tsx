'use client'

import { Genre } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { use, useOptimistic, useTransition } from 'react'

type Props = {
  genresPromise: Promise<Genre[]>
}

export default function GenreFilter({ genresPromise }: Props) {
  const genres = use(genresPromise)
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedGenres = searchParams.getAll('genre')

  const [isPending, startTransition] = useTransition()
  const [optimisticGenres, setOptimisticGenres] = useOptimistic(searchParams.getAll('genre'))

  const onToggle = (newGenres: string[]) => {
    const params = new URLSearchParams(searchParams)
    params.delete('genre')
    newGenres.forEach((genreId) => params.append('genre', genreId))
    params.set('page', '1')
    startTransition(() => {
      setOptimisticGenres(newGenres)
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <div>
      <ToggleGroup
        toggleKey="genre"
        options={genres.map((genre) => ({ label: genre.name, value: genre.id.toString() }))}
        selectedValues={optimisticGenres}
        onToggle={onToggle}
      />
      {isPending && (
        <span className="inline-block h-6 w-6 border-4 border-pink-400 border-t-slate-100 rounded-full animate-spin my-4"></span>
      )}
    </div>
  )
}

type ToggleOption = {
  label: string
  value: string
}
type ToggleGroupProps = {
  options: ToggleOption[]
  selectedValues: string[]
  toggleKey?: string
  onToggle: (_options: string[]) => void
}
function ToggleGroup({ options, selectedValues, toggleKey, onToggle }: Readonly<ToggleGroupProps>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selectedValues.includes(option.value.toString())

        return (
          <Link
            href={`?${toggleKey}=${isActive ? '' : option.value}`}
            key={option.value}
            className={cn(
              isActive ? 'text-red-500' : 'text-slate-500',
              'w-fit rounded border border-primary px-4 py-2'
            )}
            onClick={(e) => {
              e.preventDefault()
              if (isActive) {
                onToggle(
                  selectedValues.filter((selectedValue) => {
                    return selectedValue !== option.value
                  })
                )
              } else {
                onToggle([...selectedValues, option.value])
              }
            }}
          >
            {option.label}
          </Link>
        )
      })}
    </div>
  )
}
