import { client } from './sanity'

/**
 * 🔥 FESTE (alle)
 * 👉 Zukünftige zuerst, dann vergangene
 */
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"]
      | order(date >= now() desc, date asc){
      _id,
      name,
      description,
      date,
      "region": region,
      vibe,
      organizer,

      // 🔥 Bilder
      "images": coalesce(images[].asset->url, [image.asset->url], []),

      // 🔥 Inhalte
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
 * 🔥 NUR zukünftige Feste
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

        // 🔥 FESTE (nur kommende)
        ...*[_type == "fest" && date >= string::split(now(), "T")[0]]{
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
        ...*[_type == "termine" && date >= string::split(now(), "T")[0]]{
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
