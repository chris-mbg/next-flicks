export const getBasicHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  }
}
