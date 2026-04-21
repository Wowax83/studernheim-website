import { MetadataRoute } from 'next'

// optional: wenn du später dynamische Daten aus Sanity holst
// import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://studernheim.com'

  // 🔹 Statische Seiten
  const staticRoutes = [
    '',
    '/datenschutz',
    '/impressum',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  // 🔹 Dynamische Seiten (optional – aktuell deaktiviert)
  // Beispiel für /studio/[...index]
  /*
  const studios = await client.fetch(`*[_type == "studio"]{ slug }`)

  const dynamicRoutes = studios.map((studio: any) => ({
    url: `${baseUrl}/studio/${studio.slug.current}`,
    lastModified: new Date(),
  }))
  */

  return [
    ...staticRoutes,
    // ...dynamicRoutes
  ]
}
