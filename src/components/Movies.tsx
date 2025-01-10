import { Movie } from '@/lib/types'
import MovieCard from './MovieCard'

export default async function MovieList({ movieList }: { movieList: Movie[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_250px)] gap-4 mt-8">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
