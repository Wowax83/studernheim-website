export async function getContent() {
  return await client.fetch(
    `{
      "items": [

        // 🔥 FESTE
        ...*[_type == "fest"]{
          _id,
          "title": name,
          description,
          date,
          "location": region,
          "type": "fest",

          "images": coalesce(images[].asset->url, [image.asset->url], []),

          quickFacts,
          highlights
        },

        // 🔥 VEREINE
        ...*[_type == "verein"]{
          _id,
          "title": name,
          description,
          "location": region,
          "type": "verein",

          "images": coalesce(images[].asset->url, [image.asset->url], []),

          quickFacts,
          highlights
        }

      ]
    }.items`,
    {},
    { cache: "no-store" }
  )
}
