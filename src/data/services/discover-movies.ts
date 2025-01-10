'server only'

import { TMDB_BASE_URL } from '@/lib/constants'
import { slow } from '@/lib/slow'
import { emptyDiscoverMovieResult, getBasicHeaders } from './utils'
import { DiscoverMovieResult } from '@/lib/types'

export const getDiscoverMovies = async (filters: {
  query?: string
  genre?: string | string[]
  page?: number
}): Promise<DiscoverMovieResult> => {
  const endpoint = `${TMDB_BASE_URL}discover/movie`
  await slow(1000)

  const { query, genre, page } = filters

  const queryString = `?${query && 'with_keywords=' + query}&with_genres=${Array.isArray(genre) ? genre.join(',') : genre}&page=${page ?? 1}`

  console.log('Query string', queryString)

  try {
    const response = await fetch(endpoint + queryString, {
      method: 'GET',
      headers: getBasicHeaders(),
    })

    if (!response.ok) {
      console.error('Error when finding movies')
      console.log(response)
      return emptyDiscoverMovieResult
    }

    const data = await response.json()
    console.log('Response data', data)

    return data
  } catch (err) {
    console.error('Error when fetching genres', err)
    return emptyDiscoverMovieResult
  }
}
