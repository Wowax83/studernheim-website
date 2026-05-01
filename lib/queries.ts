import { client } from './sanity'

/* ---------------- KONSTANTEN ---------------- */

// 🔥 7 Tage in Millisekunden
const SEVEN_DAYS_MS = 1000 * 60 * 60 * 24 * 7

// 🔥 zentrale "aktiv" Bedingung (Event bleibt 7 Tage sichtbar)
const ACTIVE_FEST_FILTER = `
dateTime(date) + ${SEVEN_DAYS_MS} >= now()
`

/* ---------------- FESTE ---------------- */

/**
 * 🔥 ALLE FESTE
 * 👉 kommende + bis 7 Tage vergangene oben
 */
export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"]
    | order(
        ${ACTIVE_FEST_FILTER} desc,
        date asc
      ){
      _id,
      name,
      description,
      date,
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
 * 🔥 NUR AKTIVE FESTE
 * 👉 kommende + bis 7 Tage nach Event
 */
export async function getUpcomingFeste(limit = 4) {
  return await client.fetch(
    `*[_type == "fest" && ${ACTIVE_FEST_FILTER}]
      | order(date asc)[0...${limit}]{
      _id,
      name,
      description,
      date,
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

/* ---------------- VEREINE ---------------- */

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
    { cache: "no-store" }
  )
}

/* ---------------- EVENTS (STARTSEITE) ---------------- */

/**
 * 🔥 FESTE + TERMINE kombiniert
 */
export async function getAllEvents(limit = 4) {
  return await client.fetch(
    `{
      "events": [

        // 🔥 FESTE (mit 7-Tage Logik)
        ...*[_type == "fest" && ${ACTIVE_FEST_FILTER}]{
          _id,
          "title": name,
          description,
          date,
          "location": region,
          organizer,
          "type": "fest",

          "images": coalesce(images[].asset->url, [image.asset->url], []),

          quickFacts,
          highlights
        },

        // 🔥 TERMINE (nur Zukunft)
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
    { cache: "no-store" }
  )
}
