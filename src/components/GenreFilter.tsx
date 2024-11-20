'use client'

import { Genre } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { use } from 'react'

type Props = {
  genresPromise: Promise<Genre[]>
}

export default function GenreFilter({ genresPromise }: Props) {
  const genres = use(genresPromise)
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedGenres = searchParams.getAll('with_genres')

  const onToggle = (newGenres: string[]) => {
    const params = new URLSearchParams(searchParams)
    params.delete('with_genres')
    newGenres.forEach((genreId) => params.append('with_genres', genreId))
    router.push(`?${params.toString()}`)
  }

  return (
    <div>
      <ToggleGroup
        toggleKey="with_genres"
        options={genres.map((genre) => ({ label: genre.name, value: genre.id.toString() }))}
        selectedValues={selectedGenres}
        onToggle={onToggle}
      />
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
