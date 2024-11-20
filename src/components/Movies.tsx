export default async function Movies() {
  const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const movies = await data.json()

  return (
    <div>
      <h1>Movies::</h1>
      {JSON.stringify(movies)}
    </div>
  )
}
