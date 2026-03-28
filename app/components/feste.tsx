export default async function Feste() {
  const feste = await getFeste()

  return (
    <div>
      <h1>DEBUG FESTE</h1>
      <pre>{JSON.stringify(feste, null, 2)}</pre>
    </div>
  )
}
