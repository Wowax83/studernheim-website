import { client } from './sanity'

export async function getFeste() {
  return await client.fetch(
    `*[_type == "fest"]
    | order(coalesce(startDate, date) asc){
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

export async function getAllEvents(limit = 10) {
  return await client.fetch(
    `{
      "events": [

        ...*[_type == "fest" && coalesce(endDate, startDate, date) >= now()]{
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
          highlights
        },

        ...*[_type == "termine" && date >= now()]{
          _id,
          title,
          description,
          date,
          "startDate": date,
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
