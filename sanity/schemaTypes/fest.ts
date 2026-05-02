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

    // 🔥 NEU: Start & Ende (statt nur date)
    {
      name: 'startDate',
      title: 'Startdatum & Uhrzeit',
      type: 'datetime'
    },
    {
      name: 'endDate',
      title: 'Enddatum & Uhrzeit',
      type: 'datetime'
    },

    // 🔥 OPTIONAL: Fallback für alte Daten
    {
      name: 'date',
      title: 'Datum (Fallback)',
      type: 'datetime',
      description: 'Nur verwenden, wenn kein Start/Ende gesetzt ist'
    },

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

    // 🔥 BADGES
    {
      name: 'quickFacts',
      title: 'Kurzinfos (Badges)',
      type: 'array',
      of: [{ type: 'string' }]
    },

    // 🔥 LINKS / HIGHLIGHTS
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
