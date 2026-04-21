import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://studernheim.com',
      lastModified: new Date(),
    },
  ]
}
