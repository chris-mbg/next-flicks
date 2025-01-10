'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useTransition } from 'react'

export default function KeywordSearch() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') ?? ''

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('query', e.target.value)
    newSearchParams.set('page', '1')
    startTransition(() => router.push(`?${newSearchParams.toString()}`))
  }

  // TODO Make it into a two step search where there is a search for keyword which gives the user a list of keywords --> selecting one adds to the movie discover query

  return (
    <form className="my-4" onSubmit={(e) => e.preventDefault()}>
      <label className="text-sm uppercase" htmlFor="search">
        Search
      </label>
      <div className="relative flex justify-between items-center border border-slate-400 md:w-1/2">
        <input
          type="search"
          className="py-2 px-4 rounded w-full"
          placeholder="Search on keyword..."
          id="search"
          defaultValue={query}
          name="query"
          onChange={(e) => handleSearchChange(e)}
        />

        {isPending && (
          <span className="absolute -right-8 p-2 border-4 border-pink-400 border-t-slate-100 rounded-full animate-spin"></span>
        )}
      </div>
    </form>
  )
}
