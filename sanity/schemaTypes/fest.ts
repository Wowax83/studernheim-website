export default {
  name: 'fest',
  type: 'document',
  title: 'Fest',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', type: 'text', title: 'Beschreibung' },
    { name: 'date', title: 'Datum', type: 'date', },
    { name: 'region', type: 'string', title: 'Ort' },

    // 👇 NEU
    { name: 'vibe', type: 'string', title: 'Stimmung / Vibe' },
    { name: 'organizer', type: 'string', title: 'Veranstalter' },

    { name: 'image', type: 'image', title: 'Bild' },

    {
      name: 'quickFacts',
      type: 'array',
      title: 'Highlights',
      of: [{ type: 'string' }]
    }
  ]
}
