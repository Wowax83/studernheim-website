export default {
  name: 'verein',
  type: 'document',
  title: 'Verein',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },

    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' }
    },

    { name: 'description', type: 'text', title: 'Beschreibung' },

    { name: 'region', type: 'string', title: 'Ort' },

    // optional (nur wenn du willst)
    { name: 'category', type: 'string', title: 'Kategorie' },
    { name: 'contact', type: 'string', title: 'Kontakt' },

    // 🔥 Bilder (gleich wie bei Fest)
    {
      name: 'images',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ],
      description: 'Erstes Bild = Startbild'
    },

    // 🔥 Fallback (gleich wie Fest)
    {
      name: 'image',
      type: 'image',
      title: 'Altes Einzelbild (Fallback)',
      hidden: true
    },

    // 🔥 BADGES (gleich wie Fest)
    {
      name: 'quickFacts',
      title: 'Kurzinfos (Badges)',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    },

    // 🔥 LINKS (IDENTISCH zu Fest)
    {
      name: 'highlights',
      title: 'Links / Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'text',
              subtitle: 'url'
            }
          },
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string'
            },
            {
              name: 'url',
              title: 'Link',
              type: 'url'
            }
          ]
        }
      ],
      description: 'z.B. Website, Instagram, WhatsApp'
    }
  ]
}
