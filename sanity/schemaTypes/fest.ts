export default {
  name: 'fest',
  type: 'document',
  title: 'Fest',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', type: 'text', title: 'Beschreibung' },
    { name: 'date', title: 'Datum', type: 'date' },
    { name: 'region', type: 'string', title: 'Ort' },

    // 👇 NEU
    { name: 'vibe', type: 'string', title: 'Stimmung / Vibe' },
    { name: 'organizer', type: 'string', title: 'Veranstalter' },

    { name: 'image', type: 'image', title: 'Bild' },

    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
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
      ]
    }
  ]
}
