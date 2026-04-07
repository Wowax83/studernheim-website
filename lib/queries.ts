import { client } from './sanity'

/**
 * 🔥 FESTE (mit mehreren Bildern + Fallback)
 */
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"] | order(date asc){
      _id,
      name,
      description,
      date,
      "region": region,
      vibe,
      organizer,

      "images": coalesce(images[].asset->url, [image.asset->url], []),

      // 🔥 FIX
      "quickFacts": coalesce(
        quickFacts,
        highlights[].text,
        []
      )
    }`,
    {},
    {
      cache: "no-store"
    }
  )
}
/**
 * 🔥 OPTIONAL: nur zukünftige Feste (z. B. für Homepage)
 */
export async function getUpcomingFeste(limit = 4) {
  return await client.fetch(
    `*[_type == "fest" && date >= string::split(now(), "T")[0]]
      | order(date asc)[0...${limit}]{
      _id,
      name,
      description,
      date,
      "region": region,
      vibe,
      organizer,
      "images": coalesce(images[].asset->url, [image.asset->url]),
      quickFacts
    }`,
    {},
    {
      cache: "no-store"
    }
  )
}

/**
 * 🔥 VEREINE
 */
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

/**
 * 🔥 ALLE EVENTS (Feste + Termine kombiniert)
 */
export async function getAllEvents(limit = 4) {
  return await client.fetch(
    `{
      "events": [
        // 🔥 FESTE
        ...*[_type == "fest" && date >= string::split(now(), "T")[0]]{
          _id,
          name,
          description,
          date,
          "location": region,
          organizer,
          "type": "fest",
          "images": coalesce(images[].asset->url, [image.asset->url])
        },

        // 🔥 TERMINE
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
    }.events | order(date asc)[0...${limit}]`,
    {},
    {
      cache: "no-store"
    }
  )
}
