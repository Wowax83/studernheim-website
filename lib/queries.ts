import { client } from './sanity'

// 🔥 Feste holen
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"] | order(date asc){
      _id,
      name,
      description,
      date,
      region,
      vibe,
      organizer,
      "image": image.asset->url,
      quickFacts
    }`,
    {},
    {
      cache: "no-store" // 🔥 verhindert alten Cache
    }
  )
}

// 🔥 Vereine holen
export async function getVereine() {
  return await client.fetch(
    `*[_type == "verein"] | order(name asc){
      _id,
      name,
      description,
      category,
      contact,
      "image": image.asset->url,
      quickFacts
    }`,
    {},
    {
      cache: "no-store"
    }
  )
}
