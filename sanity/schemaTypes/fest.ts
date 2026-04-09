export default {
  name: 'fest',
  type: 'document',
  title: 'Fest',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },

    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' }
    },

    { name: 'description', type: 'text', title: 'Beschreibung' },

    { name: 'date', title: 'Datum', type: 'date' },

    { name: 'region', type: 'string', title: 'Ort' },

    { name: 'vibe', type: 'string', title: 'Stimmung / Vibe' },
    { name: 'organizer', type: 'string', title: 'Veranstalter' },

    // 🔥 Bilder (Slider)
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
      description: 'Erstes Bild = Startbild im Slider'
    },

    // 🔥 Fallback (alt)
    {
      name: 'image',
      type: 'image',
      title: 'Altes Einzelbild (Fallback)',
      hidden: true
    },

    // 🔥 BADGES (kurze Infos)
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

    // 🔥 NEU: LINKS (WICHTIG)
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
      description: 'z.B. Homepage oder Helferliste'
    }
  ]
}
