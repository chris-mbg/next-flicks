import { Suspense } from 'react'

import GenreFilter from '@/components/GenreFilter'
import KeywordSearch from '@/components/KeywordSearch'
import { getGenres } from '@/data/services/genre'
import { getDiscoverMovies } from '@/data/services/discover-movies'
import MovieList from '@/components/Movies'
import Pagination from '@/components/Pagination'

type PageProps = {
  searchParams: Promise<{
    query?: string
    genre?: string | string[]
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const genres = getGenres()

  const { query, genre, page } = await searchParams

  const movieData = await getDiscoverMovies({
    query,
    genre,
    page: Number(page) || 1,
  })

  return (
    <main className="container p-8">
      <h1 className="text-center p-4 text-2xl font-semibold">Discover movies</h1>
      {/* Search bar */}
      <KeywordSearch />

      {/* Toggle buttons for Genre*/}
      <Suspense fallback={<h1 className="text-red-600 font-bold text-2xl">Loading...</h1>}>
        <GenreFilter genresPromise={genres} />
      </Suspense>

      <MovieList movieList={movieData.results} />

      {!!movieData.results.length && <Pagination currentPage={Number(page) || 1} lastPage={movieData.total_pages} />}
    </main>
  )
}
