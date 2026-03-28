import { client } from './sanity'

export async function getFeste() {
  return await client.fetch(`*[_type == "fest"]{
    _id,
    name,
    description,
    date,
    region,
    "image": image.asset->url,
    quickFacts
  }`)
}

export async function getVereine() {
  return await client.fetch(`*[_type == "verein"]{
    _id,
    name,
    description,
    category,
    contact,
    "image": image.asset->url,
    quickFacts
  }`)
}
