import 'server-only'

import { TMDB_BASE_URL } from '@/lib/constants'
import { slow } from '@/lib/slow'

import { getBasicHeaders } from './utils'
import { Genre } from '@/lib/types'

export const getGenres = async (): Promise<Genre[]> => {
  const endpoint = `${TMDB_BASE_URL}genre/movie/list`
  await slow(1000)

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: getBasicHeaders(),
    })

    if (!response.ok) {
      console.error('Error when fetching genres')
      return []
    }

    const data = await response.json()

    return data.genres as Genre[]
  } catch (err) {
    console.error('Error when fetching genres')
    return []
  }
}
