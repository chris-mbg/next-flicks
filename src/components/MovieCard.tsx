import { Movie } from '@/lib/types'
import Image from 'next/image'

export default function MovieCard({ movie }: { movie: Movie }) {
  // TODO Make this globally avaliable
  const IMAGE_BASE_PATH = 'http://image.tmdb.org/t/p/original'

  return (
    <div className="rounded-lg overflow-hidden group relative cursor-pointer transition-all hover:-translate-y-1">
      <Image src={IMAGE_BASE_PATH + movie.poster_path} width={300} alt={movie.title} height={150} />
      <div className="bg-slate-300/80 absolute inset-0 pointer-events-none text-yellow-800 font-semibold flex-col text-center justify-end py-2 px-1 text-2xl hidden group-hover:flex">
        <p>{movie.title}</p>
        <p className="text-lg">{movie.release_date}</p>
      </div>
    </div>
  )
}
