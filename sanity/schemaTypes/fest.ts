export default {
  name: 'fest',
  type: 'document',
  title: 'Fest',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', type: 'text', title: 'Beschreibung' },
    { name: 'date', type: 'string', title: 'Datum' },
    { name: 'region', type: 'string', title: 'Ort' },
    { name: 'image', type: 'image', title: 'Bild' },
    {
      name: 'quickFacts',
      type: 'array',
      title: 'Highlights',
      of: [{ type: 'string' }]
    }
  ]
}
