import { client } from './sanity'

/**
 * 🔥 FESTE (alle)
 * 👉 Zukünftige zuerst, dann vergangene
 */
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"]{
      _id,
      name,
      description,
      date,
      "region": region,
      vibe,
      organizer,

      "images": coalesce(images[].asset->url, [image.asset->url], []),

      highlights,
      quickFacts,

      // ✅ wichtig für Sortierung
      "isUpcoming": date >= now()
    }
    | order(isUpcoming desc, date asc)`,
    {},
    {
      cache: "no-store"
    }
  )
}

/**
 * 🔥 NUR zukünftige Feste
 */
export async function getUpcomingFeste(limit = 4) {
  return await client.fetch(
    `*[_type == "fest" && date >= now()]
      | order(date asc)[0...${limit}]{
      _id,
      name,
      description,
      date,
      "region": region,
      vibe,
      organizer,

      "images": coalesce(images[].asset->url, [image.asset->url], []),

      highlights,
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
    `*[_type == "verein"] | order(name asc){
      _id,
      name,
      description,
      region,

      "images": coalesce(images[].asset->url, [image.asset->url], []),

      quickFacts,
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

        // 🔥 FESTE (nur kommende)
        ...*[_type == "fest" && date >= now()]{
          _id,
          "title": name,
          description,
          date,
          "location": region,
          organizer,
          "type": "fest",

          "images": coalesce(images[].asset->url, [image.asset->url], []),

          highlights,
          quickFacts
        },

        // 🔥 TERMINE
        ...*[_type == "termine" && date >= now()]{
          _id,
          title,
          description,
          date,
          location,
          organizer,
          time,
          "type": coalesce(type, "termin"),

          highlights
        }
      ]
    }.events | order(date asc)[0...${limit}]`,
    {},
    {
      cache: "no-store"
    }
  )
}
