'use client'

// import { cn } from '@/lib/utils'
// import Link from 'next/link'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { ChangeEvent, useTransition } from 'react'

export default function KeywordSearch() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('query', e.target.value)
    startTransition(() => router.push(`?${newSearchParams.toString()}`))
  }

  return (
    <form className="my-4">
      <label className="text-sm uppercase" htmlFor="search">
        Search
      </label>
      <div className="relative flex justify-between items-center border border-slate-400">
        <input
          type="search"
          className="py-2 px-4 rounded w-full md:w-1/2"
          placeholder="Search on keyword..."
          id="search"
          defaultValue={query}
          name="search-query"
          onChange={(e) => handleSearchChange(e)}
        />
        {/* Indicate loading */}
        {isPending && (
          <span className="absolute -right-8 p-2 border-4 border-pink-400 border-t-slate-100 rounded-full animate-spin"></span>
        )}
      </div>
    </form>
  )
}
