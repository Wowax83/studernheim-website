import { client } from './sanity'

// 🔥 Feste holen
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"] | order(date asc){
      _id,
      name,
      description,
      date,
      "location": region,
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
    `*[_type == "verein"] | order(title asc){
      _id,
      title,
      description,
      category,
      contact,
      "image": image.asset->url,
      highlights
    }`,
    {},
    {
      cache: "no-store"
    }
  )
}
export async function getAllEvents() {
  return await client.fetch(
    `{
      "events": [
        ...*[_type == "fest" && date >= string::split(now(), "T")[0]]{
          _id,
          name,
          description,
          date,
          "location": region,
          organizer,
          "type": "fest"
        },
        ...*[_type == "termine" && date >= string::split(now(), "T")[0]]{
          _id,
          title,
          description,
          date,
          location,
          organizer,
          time,
          "type": "termin"
        }
      ]
    }.events | order(date asc)[0...4]`,
    {},
    {
      cache: "no-store"
    }
  )
}
