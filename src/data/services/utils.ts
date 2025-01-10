export const getBasicHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

export const emptyDiscoverMovieResult = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
}
