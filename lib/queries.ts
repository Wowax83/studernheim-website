import { client } from './sanity'

/**
 * 🔥 FESTE (alle)
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

      // 🔥 Bilder safe
      "images": coalesce(images[].asset->url, [image.asset->url], []),

      // 🔥 Highlights FIX (alt + neu kompatibel)
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
 * 🔥 NUR zukünftige Feste (Homepage etc.)
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

      // 🔥 Bilder safe
      "images": coalesce(images[].asset->url, [image.asset->url], []),

      // 🔥 Highlights FIX
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

          "images": coalesce(images[].asset->url, [image.asset->url], []),

          // 🔥 auch hier wichtig!
          "quickFacts": coalesce(
            quickFacts,
            highlights[].text,
            []
          )
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
