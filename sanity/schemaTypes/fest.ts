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

    // 🔥 Zusatzinfos
    { name: 'vibe', type: 'string', title: 'Stimmung / Vibe' },
    { name: 'organizer', type: 'string', title: 'Veranstalter' },

    // 🔥 NEU: mehrere Bilder (Slider)
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

    // 🔥 OPTIONAL: altes Feld drin lassen (Fallback)
    {
      name: 'image',
      type: 'image',
      title: 'Altes Einzelbild (Fallback)',
      hidden: true
    },

    // 🔥 Highlights (für Hover bei dir)
    {
      name: 'quickFacts',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    }
  ]
}
