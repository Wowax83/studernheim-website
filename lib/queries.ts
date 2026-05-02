import { client } from './sanity'

/**
 * 🔥 FESTE (alle)
 * 👉 Chronologisch sortiert (startDate bevorzugt)
 */
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"] 
    | order(coalesce(startDate, date) asc){
      _id,
      name,
      description,

      // 🔥 Zeitfelder
      date,
      startDate,
      endDate,

      region,
      vibe,
      organizer,

      // 🔥 Bilder (Fallback sicher)
      "images": coalesce(images[].asset->url, [image.asset->url], []),

      quickFacts,
      highlights
    }`,
    {},
    { cache: "no-store" }
  )
}

/**
 * 🔥 NUR zukünftige Feste
 */
export async function getUpcomingFeste(limit = 4) {
  return await client.fetch(
    `*[_type == "fest" && coalesce(startDate, date) >= now()]
      | order(coalesce(startDate, date) asc)[0...${limit}]{
      _id,
      name,
      description,

      date,
      startDate,
      endDate,

      region,
      vibe,
      organizer,

      "images": coalesce(images[].asset->url, [image.asset->url], []),

      quickFacts,
      highlights
    }`,
    {},
    { cache: "no-store" }
  )
}

/**
 * 🔥 VEREINE
 */
export async function getVereine() {
  return await client.fetch(
    `*[_type == "verein"] 
    | order(name asc){
      _id,
      name,
      description,
      region,

      "images": coalesce(images[].asset->url, [image.asset->url], []),

      quickFacts,
      highlights
    }`,
    {},
    { cache: "no-store" }
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
        ...*[_type == "fest"]{
          _id,
          "title": name,
          description,

          date,
          startDate,
          endDate,

          "location": region,
          organizer,
          "type": "fest",

          "images": coalesce(images[].asset->url, [image.asset->url], []),

          quickFacts,
          highlights
        },

        // 🔥 TERMINE
        ...*[_type == "termine"]{
          _id,
          title,
          description,
          date,
          time,
          location,
          organizer,
          "type": coalesce(type, "termin"),

          highlights
        }
      ]
    }.events 
    | order(coalesce(startDate, date) asc)[0...${limit}]`,
    {},
    { cache: "no-store" }
  )
}
