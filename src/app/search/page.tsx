import { Suspense } from 'react'

import GenreFilter from '@/components/GenreFilter'
import KeywordSearch from '@/components/KeywordSearch'
import { getGenres } from '@/data/services/genre'

export default function SearchPage() {
  const genres = getGenres()

  return (
    <main className="container p-8">
      <h1 className="text-center p-4 text-2xl font-semibold">Discover movies</h1>
      {/* Search bar */}
      <KeywordSearch />

      {/* Toggle buttons for Genre*/}
      <Suspense fallback={<h1 className="text-red-600 font-bold text-2xl">Loading...</h1>}>
        <GenreFilter genresPromise={genres} />
      </Suspense>

      {/* List of search results (movies) */}
      {/* Pagination */}
    </main>
  )
}
